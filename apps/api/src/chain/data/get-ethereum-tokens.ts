import { writeFile } from 'fs/promises'

const BASE_URL = 'https://metadata.p.rainbow.me/token-list/rainbow-token-list.json'

async function getTokens() {
  const response = await fetch(BASE_URL)
  try {
    const json = (await response.json()) as RequestResponse
    return json
  } catch (error) {
    console.trace(error)
    throw new Error('Failed to fetch polygon tokens')
  }
}

type Token = Record<string, { symbol: string; name: string; decimals: number }>

function filterTokens(tokens: RequessResponseToken[]) {
  const ethereum = {} as Token
  tokens.map(({ address, symbol, name, decimals }) => {
    ethereum[address] = { symbol, name, decimals }
  })

  return ethereum
}

export async function main() {
  const response = await getTokens()
  const { tokens } = response
  const ethereum = filterTokens(tokens)

  await writeFile(`${__dirname}/tokens/ethereum.json`, JSON.stringify(ethereum))
  const ethereumContracts = Object.keys(ethereum)
  await writeFile(`${__dirname}/tokens/ethereum-contracts.json`, JSON.stringify(ethereumContracts))
}

;(async () => main())()

interface RequestResponse {
  keywords: string[]
  logoURI: string
  name: string
  timestamp: string
  tokens: RequessResponseToken[]
  version: { major: number; minor: number; patch: number }
}

interface RequessResponseToken {
  address: string
  chainId: number
  decimals: number
  name: string
  symbol: string
  extensions?: {
    color: string
    isRainbowCurated: boolean
    isVerified: boolean
  }
}
