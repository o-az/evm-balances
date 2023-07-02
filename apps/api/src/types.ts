import type { Address } from 'viem'
import type { ChainID } from './constants'

export type Chain =
  | 'ethereum'
  | 'gnosis'
  | 'polygon'
  | 'optimism'
  | 'celo'
  | 'moonbeam'
  | 'avalanche'
  | 'fantom'
  | 'bsc'
  | 'arbitrum'
  | 'harmony'

export type UnsupportedChain =
  /**
   * but soon
   */
  | 'sepolia'
  | 'polygonMumbai'
  | 'moonriver'
  | 'evmos'
  | 'aurora'
  | 'avalancheFuji'
  | 'baseGoerli'
  | 'optimismGoerli'
  | 'fantomTestnet'
  | 'centoTestnet'
  | 'arbitrumNova'
  | 'bitorrnet'
  | 'cento'
  | 'arbitrumGoerli'
  | 'aurora'
  | 'goerli'

export type TokenBalance = Pretty<
  Token & {
    balance: string
  }
>

export interface RPC_Response<T = string> {
  jsonrpc: '2.0'
  id: number | null
  error?: { code: number; message: string }
  result: T
}

export interface Token {
  chainId: ChainID
  address: Address
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export type Environment = Pretty<Env>

export interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void
  passThroughOnException(): void
}

export type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}

export type Truthy<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends undefined | null ? never : K
  }[keyof T]
>
