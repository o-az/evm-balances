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

export type TestnetChain = 'ropsten' | 'rinkeby' | 'polygon-testnet' | 'bsc-testnet' | 'avalance-testnet'

export type MainnetChain = 'bsc' | 'fantom' | 'ethereum' | 'avalanche' | 'polygon' | 'optimism' | 'arbitrum'

export type Maybe<T> = T | null | undefined

export type StringWithAutocomplete<T> = T | (string & Record<never, never>)
