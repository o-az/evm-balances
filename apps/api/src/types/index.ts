export interface PathParams {
  chain: Chain
  address: string
}

export interface QueryParams {
  token: string
}

export interface Balance {
  address: string
  balance: string | number
  name: string
  symbol: string
  decimals: number
}

export type Token = {
  [K in string]: { symbol: string; name: string; decimals: number }
}

export type Chain = MainnetChain | TestnetChain
export type TestnetChain = 'ropsten' | 'rinkeby' | 'polygon-mumbai' | 'bsctestnet'

export type MainnetChain =
  | 'fantom'
  | 'polygon-mainnet'
  | 'ethereum'
  | 'avalanche'
  | 'bsc'
  | 'optimism'
  | 'arbitrum'
