import type { Chain, Balance, Token } from '@/types'
import { DEPLOYED_CONTRACTS, chains } from '@/chain/constants'
import { rpcRequest } from '@/chain/rpc-request'
import type { PossibleChainNames } from './mapper'
import { POSSIBLE_CHAIN_NAMES, mapChain } from './mapper'

// getBalances(address,address[])
const METHOD_HASH_SIGNATURE = '0x6a385ae9'

const ETH_ADDRESS_REGEX = /^0x[0-9a-fA-F]{40}$/

export async function getTokensBalances({
  address,
  tokens,
  chain,
}: {
  address: string
  tokens?: string[]
  chain: PossibleChainNames | Chain
}): Promise<{ balances: Balance[]; error: string | null }> {
  try {
    if (!ETH_ADDRESS_REGEX.test(address)) {
      throw new Error(`Invalid address: ${address}`)
    }
    if (POSSIBLE_CHAIN_NAMES.indexOf(chain) === -1) {
      throw new Error(`Invalid chain: ${chain}. Must be one of ${POSSIBLE_CHAIN_NAMES.join(', ')}`)
    }
    const mappedChain = mapChain(chain)
    const _chain = mappedChain.includes('-') ? mappedChain.split('-')[0] : mappedChain
    const tokenAddresses: string[] = tokens ?? (await import(`./data/tokens/${_chain}-contracts.json`)).default

    const result = await rpcRequest({
      from: '0x0000000000000000000000000000000000000000',
      data: buildCallData({
        address,
        tokens: tokenAddresses,
        method: METHOD_HASH_SIGNATURE,
      }),
      to: DEPLOYED_CONTRACTS[mappedChain],
      chain: mappedChain,
    })
    if (!result) throw new Error('No result from RPC request')
    const parsedResult = result.replace('0x', '').slice(64 * 2)

    const chunks = parsedResult.match(/.{1,64}/g)
    if (!chunks) return { balances: [], error: 'No balances returned from RPC request' }

    const { default: tokenList } = (await import(`./data/tokens/${_chain}.json`)) as { default: Token }
    if (!tokenList) throw new Error(`No token list available for chain ${_chain}`)

    const balances = [] as Balance[]
    for (let i = 0; i < tokenAddresses.length; i++) {
      const token = tokenList[tokenAddresses[i].toLowerCase()]

      if (!token) continue
      const { decimals, name, symbol } = token
      const balance = parseInt(chunks[i], 16) / Math.pow(10, decimals)
      if (balance === 0) continue
      balances.push({
        name,
        symbol,
        balance,
        address: tokenAddresses[i],
        decimals,
      })
    }
    return { balances, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `${error}`
    return { balances: [], error: errorMessage }
  }
}

function buildCallData({ method, address, tokens }: { method: string; address: string; tokens: string[] }) {
  const data = [
    method,
    '0'.repeat(64 - address.slice(2).length),
    address.slice(2),
    '0'.repeat(64 - 2),
    '40',
    '0'.repeat(64 - tokens.length.toString(16).length),
    tokens.length.toString(16),
    ...tokens.map(token => '0'.repeat(64 - token.slice(2).length) + token.slice(2)),
  ]
  return data.join('').toLowerCase()
}
