import { writeFile } from 'fs/promises'

const urls = [
  'https://tokens.pancakeswap.finance/pancakeswap-top-100.json',
  'https://tokens.pancakeswap.finance/pancakeswap-extended.json',
]

async function getTokens({ extended = false }) {
  const response = await fetch(urls[extended ? 1 : 0])
  try {
    const json = (await response.json()) as PancakeSwapResponse
    return json
  } catch (error) {
    console.trace(error)
    throw new Error('Failed to fetch polygon tokens')
  }
}

type Token = Record<string, { symbol: string; name: string; decimals: number }>

function filterTokens(tokens: MappingToken[]): Token {
  const bsc = {} as Token
  tokens.map(({ name, address, symbol, decimals }) => {
    bsc[address.toLowerCase()] = { symbol, name, decimals }
  })
  return bsc
}

async function main() {
  const { tokens } = await getTokens({ extended: true })
  const filteredTokens = filterTokens(tokens)
  await writeFile(__dirname + '/tokens/bsc.json', JSON.stringify(filteredTokens))
  const contracts = Object.keys(filteredTokens)
  await writeFile(__dirname + '/tokens/bsc-contracts.json', JSON.stringify(contracts))
}

;(async () => main())()

interface PancakeSwapResponse {
  name: string
  timestamp: string
  version: { major: number; minor: number; patch: number }
  logoURI: string
  keywords: string[]
  tokens: MappingToken[]
}

interface MappingToken {
  name: string
  symbol: string
  address: string
  chainId: number
  decimals: number
  logoURI: string
}
