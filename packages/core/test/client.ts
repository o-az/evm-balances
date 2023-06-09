import { createPublicClient, http, createWalletClient } from 'viem'

export const chains = [
	'foundry',
	'gnosis',
	'sepolia',
	'goerli',
	'polygon',
	'polygonMumbai',
	'optimism',
	'optimismGoerli',
	'mainnet',
	'celo',
	'moonbeam',
	'moonriver',
	'avalanche',
	'fantom',
	'arbitrum',
	'bsc',
	'harmonyOne',
] as const

export type Chain = (typeof chains)[number]

export const httpUrl = {
	foundry: 'http://127.0.0.1:8545',
	gnosis: '',
	sepolia: '',
	goerli: '',
	polygon: '',
	polygonMumbai: '',
	optimism: '',
	optimismGoerli: '',
	mainnet: '',
	celo: '',
	moonbeam: '',
	moonriver: '',
	avalanche: '',
	fantom: '',
	arbitrum: 'https://arb1.arbitrum.io/rpc',
	bsc: '',
	harmonyOne: 'https://api.harmony.one',
} satisfies { [chain in Chain]: string }

export const publicClient = (chain: Chain) =>
	createPublicClient({
		//@ts-expect-error
		chain: chains[chain],
		transport: http(httpUrl[chain]),
	})

export const walletClient = (chain: Chain) =>
	createWalletClient({
		//@ts-expect-error
		chain: chains[chain],
		transport: http(httpUrl[chain]),
	})
