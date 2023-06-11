import type { Address, Chain as _Chain } from 'viem'

export type Chain =
	| 'gnosis'
	| 'sepolia'
	| 'goerli'
	| 'polygon'
	| 'polygonMumbai'
	| 'optimism'
	| 'optimismGoerli'
	| 'mainnet'
	| 'celo'
	| 'moonbeam'
	| 'avalanche'
	| 'fantom'
	| 'bsc'
	| 'aurora'
	| 'avalancheFuji'
	| 'fantomTestnet'
	| 'arbitrum'
	| 'arbitrumGoerli'
	| 'harmonyOne'
	| 'baseGoerli'

/**
 * Object containing contract addresses and RPC URLs for each supported chain.
 */
export const chains = {
	gnosis: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	sepolia: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	goerli: {
		contract: '0x694be3BCecAf1dD69ba91D21c54E22C87882a595',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	polygon: {
		contract: '0x8b08FE6F8443f7bBbEde50Ecc8B020d9e44997a2',
		rpcUrls: environment => ({
			http: [`https://polygon.llamarpc.com/rpc/${environment.LLAMANODES_API_KEY}`],
		}),
	},
	polygonMumbai: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	optimism: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	optimismGoerli: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	mainnet: {
		contract: '0x13675852Ac733AEd5679985778BE5c18E64E97FA',
		rpcUrls: environment => ({
			http: [`https://eth.llamarpc.com/rpc/${environment.LLAMANODES_API_KEY}`],
		}),
	},
	celo: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	moonbeam: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	avalanche: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		rpcUrls: _ => ({
			http: ['https://api.avax.network/ext/bc/C/rpc'],
		}),
	},
	fantom: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		rpcUrls: _ => ({
			http: ['https://rpc.fantom.network', 'https://rpc2.fantom.network'],
		}),
	},
	bsc: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		rpcUrls: _ => ({
			http: ['https://bsc-dataseed.binance.org'],
		}),
	},
	aurora: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		rpcUrls: _ => ({
			http: ['https://mainnet.aurora.dev'],
		}),
	},
	avalancheFuji: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	fantomTestnet: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		rpcUrls: _ => ({
			http: [''],
		}),
	},
	arbitrum: {
		contract: '0x77e883446e4cDE8955b4ce07DfCf0E9887B0e66c',
		rpcUrls: _ => ({
			http: ['https://arb1.arbitrum.io/rpc'],
		}),
	},
	arbitrumGoerli: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		rpcUrls: _ => ({
			http: ['https://goerli.arbitrum.io/rpc'],
		}),
	},
	harmonyOne: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		rpcUrls: _ => ({
			http: ['https://api.harmony.one'],
		}),
	},
	baseGoerli: {
		contract: '0x4a54047B53C5B011b00AcBdec84c090e6Cc175E2',
		rpcUrls: _ => ({
			http: ['https://goerli.infura.io/v3'],
		}),
	},
} satisfies Record<
	Chain,
	{
		contract: Address
		rpcUrls: (environment: Env) => {
			http: Array<string>
			webSocket?: Array<string>
		}
	}
>

export const rpcUrls = (chain: Chain, environment: Env) => chains[chain].rpcUrls(environment)

export const invalidResponse = {
	chain: {
		success: false,
		message: 'Chain not supported. Visit /supported-chains to learn more',
	},
	walletAddress: {
		success: false,
		message: 'Invalid wallet address',
	},
	tokenAddress: {
		success: false,
		message: 'Request contains invalid token address',
	},
}
