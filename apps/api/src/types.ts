export type TokenBalance = Pretty<Token & { balance: string }>

export type Chain = MainnetChain | TestnetChain

export type MainnetChain =
	| 'mainnet'
	| 'gnosis'
	| 'polygon'
	| 'optimism'
	| 'celo'
	| 'moonbeam'
	| 'avalanche'
	| 'fantom'
	| 'bsc'
	| 'aurora'
	| 'arbitrum'
	| 'harmonyOne'

export type TestnetChain =
	| 'sepolia'
	| 'goerli'
	| 'optimismGoerli'
	| 'polygonMumbai'
	| 'avalancheFuji'
	| 'fantomTestnet'
	| 'arbitrumGoerli'
	| 'baseGoerli'

export interface Token {
	chainId: number
	address: `0x${string}`
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
