import type { Chain, Balance, Token } from '@/types'
import { DEPLOYED_CONTRACTS, chains } from '@/chain/constants'
import { evmRpcRequest, evmRpcBatchRequest } from '@/chain/rpc'
import type { PossibleChainNames } from './mapper'
import { POSSIBLE_CHAIN_NAMES, mapChain } from './mapper'
import { ArrayToChunks } from '@/utilities'

// getBalances(address,address[])
const METHOD_HASH_SIGNATURE = '0x6a385ae9'

const ETH_ADDRESS_REGEX = /^0x[0-9a-fA-F]{40}$/

export const getBatchLimit = (chain: Chain) => (chain === 'ethereum' ? 1000 : Infinity)

interface BalancesResponse {
  balances: Balance[]
  error: string | null
}

// TODO: check if token contract array length > N then use batch request

export async function getTokensBalances({
  address,
  tokens,
  chain,
}: {
  address: string
  tokens?: string[]
  chain: PossibleChainNames | Chain
}): Promise<BalancesResponse> {
  try {
    if (!ETH_ADDRESS_REGEX.test(address)) throw new Error(`Invalid address: ${address}`)

    if (POSSIBLE_CHAIN_NAMES.indexOf(chain) === -1) {
      throw new Error(`Invalid chain: ${chain}. Must be one of ${POSSIBLE_CHAIN_NAMES.join(', ')}`)
    }
    const mappedChain = mapChain(chain)
    const _chain = mappedChain.includes('-') ? mappedChain.split('-')[0] : mappedChain

    const { default: tokenList } = (await import(`./data/tokens/${_chain}.json`)) as { default: Token }
    const tokenAddresses = tokens ?? Object.keys(tokenList)
    const contract = DEPLOYED_CONTRACTS[mappedChain]
    const batchLimit = getBatchLimit(mappedChain)

    if (tokenAddresses.length > batchLimit) {
      const chunks = ArrayToChunks(tokenAddresses, batchLimit)
      const dataArray = chunks.map(tokens => buildCallData({ method: METHOD_HASH_SIGNATURE, address, tokens }))
      const response = await evmRpcBatchRequest({ chain: mappedChain, contract, dataArray })
      const outOfGas = response.filter(({ error }) => error?.code === -32000).map(({ error }) => error)

      const results = response
        .filter(({ result }) => !!result)
        .map(({ result }) => parseResult(result!, chunks.flat(), tokenList))

      const balances = results.flatMap(result => result)
      return { balances, error: null }
    }

    const rpcData = buildCallData({ address, tokens: tokenAddresses, method: METHOD_HASH_SIGNATURE })
    const { result, error } = await evmRpcRequest({
      chain: mappedChain,
      data: rpcData,
      contract: DEPLOYED_CONTRACTS[mappedChain],
    })

    if (error || !result) return { balances: [], error: error?.message ?? 'No result from RPC request' }

    const balances = parseResult(result, tokenAddresses, tokenList)

    return { balances, error: null }
  } catch (error) {
    console.log({ error })
    const errorMessage = error instanceof Error ? error.message : `${error}`
    return { balances: [], error: errorMessage }
  }
}

function parseResult(result: string, tokenAddresses: string[], tokens: Token) {
  const parsedResult = result.replace('0x', '').slice(64 * 2)
  const chunks = parsedResult.match(/.{1,64}/g)
  if (!chunks) return []
  const balances = [] as Balance[]
  for (let index = 0; index < tokenAddresses.length; index++) {
    const token = tokens[tokenAddresses[index].toLowerCase()]
    if (!token) continue
    const { decimals } = token
    const balance = parseInt(chunks[index], 16) / Math.pow(10, decimals)
    if (!balance) continue
    balances.push({ ...token, balance, address: tokenAddresses[index] })
  }
  return balances
}

function buildCallData({ method, address, tokens }: { method: string; address: string; tokens: string[] }) {
  const _address = address.toLowerCase()
  return String(
    method +
      '0'.repeat(64 - _address.slice(2).length) +
      _address.slice(2) +
      '0'.repeat(64 - 2) +
      '40' +
      '0'.repeat(64 - tokens.length.toString(16).length) +
      tokens.length.toString(16) +
      tokens.map(token => '0'.repeat(64 - token.slice(2).length) + token.slice(2)).join('')
  ).toLowerCase()
}