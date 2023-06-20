import type { Address, Chain as _Chain } from 'viem'
import type { Chain, Token } from '../types'
import { formatRPC, strictFormatRPC } from '../utilities'

/**
 * Object containing contract addresses and RPC URLs for each supported chain.
 */
export const chains = {
	mainnet: {
		contract: '0x13675852Ac733AEd5679985778BE5c18E64E97FA',
		gasToken: {
			address: '0x0000000000000000000000000000000000000000',
			decimals: 18,
			symbol: 'ETH',
			name: 'Ether',
			logoURI: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
			chainId: 1,
		},
		rpcUrls: environment => ({
			http: [
				formatRPC('https://eth.llamarpc.com/rpc', environment.LLAMANODES_API_KEY),
				formatRPC('https://rpc.ankr.com/eth', environment.ANKR_API_KEY),
				strictFormatRPC('https://mainnet.chainnodes.org', environment.CHAINNODES_API_KEY),
			].filter(Boolean),
			webSocket: [`wss://eth.llamarpc.com/rpc/${environment.LLAMANODES_API_KEY}`],
		}),
	},
	gnosis: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		gasToken: {
			address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
			name: 'xDai',
			symbol: 'xDAI',
			decimals: 18,
			chainId: 100,
			logoURI: 'https://docs.gnosischain.com/img/tokens/xdai.png',
		},
		rpcUrls: environment => ({ http: [`https://rpc.ankr.com/gnosis/${environment.ANKR_API_KEY}`], webSocket: [] }),
	},
	polygon: {
		contract: '0x8b08FE6F8443f7bBbEde50Ecc8B020d9e44997a2',
		gasToken: {
			address: '0x0000000000000000000000000000000000001010',
			name: 'Polygon',
			symbol: 'MATIC',
			logoURI: 'https://asset-images.messari.io/images/4b474270-99ba-4a18-869d-11cd3fc0201a/128.png',
			chainId: 137,
			decimals: 18,
		},
		rpcUrls: environment => ({
			http: [
				`https://rpc.ankr.com/polygon/${environment.ANKR_API_KEY}`,
				`https://polygon.llamarpc.com/rpc/${environment.LLAMANODES_API_KEY}`,
			],
			webSocket: [`wss://polygon.llamarpc.com/rpc/${environment.LLAMANODES_API_KEY}`],
		}),
	},
	optimism: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		gasToken: {
			address: '0x0000000000000000000000000000000000001010',
			decimals: 18,
			symbol: 'ETH',
			name: 'Optimism Ether',
			logoURI: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
			chainId: 10,
		},
		rpcUrls: environment => ({ http: [`https://rpc.ankr.com/optimism/${environment.ANKR_API_KEY}`], webSocket: [] }),
	},
	celo: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		gasToken: {
			name: 'Celo',
			symbol: 'CELO',
			decimals: 18,
			address: '0x471EcE3750Da237f93B8E339c536989b8978a438',
			chainId: 42_220,
			logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5567.png',
		},
		rpcUrls: environment => ({ http: [`https://rpc.ankr.com/celo/${environment.ANKR_API_KEY}`], webSocket: [] }),
	},
	moonbeam: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		gasToken: {
			address: '0x0000000000000000000000000000000000000802',
			name: 'GLMR',
			symbol: 'GLMR',
			decimals: 18,
			chainId: 1_284,
			logoURI: 'https://stakingcrypto.info/static/assets/coins/moonbeam-logo.png',
		},
		rpcUrls: environment => ({ http: [`https://rpc.ankr.com/moonbeam/${environment.ANKR_API_KEY}`], webSocket: [] }),
	},
	avalanche: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		gasToken: {
			address: '0x0100000000000000000000000000000000000001',
			decimals: 18,
			symbol: 'AVAX',
			name: 'Avalanche',
			chainId: 43_114,
			logoURI: 'https://asset-images.messari.io/images/e5661483-5cd1-4416-a09a-6c7466310442/128.png',
		},
		rpcUrls: environment => ({
			http: [
				//
				`https://rpc.ankr.com/avalanche/${environment.ANKR_API_KEY}`,
				'https://api.avax.network/ext/bc/C/rpc',
			],
			webSocket: [],
		}),
	},
	fantom: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		gasToken: {
			address: '0x0100000000000000000000000000000000000001',
			decimals: 18,
			symbol: 'FTM',
			name: 'Fantom',
			chainId: 250,
			logoURI: 'https://s3.coinmarketcap.com/static/img/portraits/62d51d9af192d82df8ff3a83.png',
		},
		rpcUrls: environment => ({
			http: [
				`https://rpc.ankr.com/fantom/${environment.ANKR_API_KEY}`,
				'https://rpc.fantom.network',
				'https://rpc2.fantom.network',
			],
			webSocket: [],
		}),
	},
	bsc: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		gasToken: {
			address: '0x0100000000000000000000000000000000000001',
			decimals: 18,
			symbol: 'BNB',
			name: 'Binance Coin',
			chainId: 56,
			logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
		},
		rpcUrls: environment => ({
			http: [
				'https://bsc-dataseed.binance.org',
				'https://bsc-dataseed1.defibit.io',
				'https://bsc-dataseed1.ninicoin.io',
				'https://bsc.nodereal.io',
				`https://rpc.ankr.com/bsc/${environment.ANKR_API_KEY}`,
			],
			webSocket: [],
		}),
	},
	aurora: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		gasToken: {
			address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
			chainId: 1_313_161_554,
			decimals: 18,
			name: 'Aurora Ether',
			symbol: 'ETH',
			logoURI: 'https://uploads-ssl.webflow.com/62f34c32e8660c273054c17c/62fb88da91c3849493a61197_aurora%20logo.png',
		},
		rpcUrls: _ => ({
			http: ['https://mainnet.aurora.dev'],
			webSocket: ['wss://mainnet.aurora.dev'],
		}),
	},
	arbitrum: {
		contract: '0x77e883446e4cDE8955b4ce07DfCf0E9887B0e66c',
		gasToken: {
			address: '0x0000000000000000000000000000000000001010',
			decimals: 18,
			symbol: 'ETH',
			name: 'Arbitrum Ether',
			chainId: 42_161,
			logoURI: 'https://cdn.cdnlogo.com/logos/e/81/ethereum-eth.svg',
		},
		rpcUrls: environment => ({
			http: [`https://rpc.ankr.com/arbitrum/${environment.ANKR_API_KEY}`, 'https://arb1.arbitrum.io/rpc'],
			webSocket: [],
		}),
	},
	harmonyOne: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		gasToken: {
			address: '0x0000000000000000000000000000000000001010',
			decimals: 18,
			symbol: 'ONE',
			name: 'Harmony One',
			chainId: 166_660_000,
			logoURI: 'https://bridge.harmony.one/one.svg',
		},
		rpcUrls: environment => ({
			http: [`https://rpc.ankr.com/harmony/${environment.ANKR_API_KEY}`, 'https://api.harmony.one'],
			webSocket: [],
		}),
	},

	/** Testnets */
	sepolia: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		gasToken: {
			address: '0x0000000000000000000000000000000000000000',
			decimals: 18,
			name: 'Ether',
			symbol: 'ETH',
			chainId: 11_155_111,
			logoURI: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
		},
		rpcUrls: environment => ({
			http: ['https://eth-sepolia.public.blastapi.io', `https://rpc.ankr.com/eth_sepolia/${environment.ANKR_API_KEY}`],
			webSocket: [],
		}),
	},

	goerli: {
		contract: '0x694be3BCecAf1dD69ba91D21c54E22C87882a595',
		gasToken: {
			address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
			chainId: 5,
			decimals: 18,
			name: 'Goerli Ether',
			symbol: 'ETH',
			logoURI: 'https://ethereum-optimism.github.io/data/ETH/logo.svg˛',
		},
		rpcUrls: environment => ({
			http: [`https://rpc.ankr.com/eth_goerli/${environment.ANKR_API_KEY}`, 'https://eth-goerli.public.blastapi.io'],
			webSocket: [],
		}),
	},
	polygonMumbai: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		gasToken: {
			address: '0x0000000000000000000000000000000000001010',
			name: 'Polygon',
			symbol: 'MATIC',
			logoURI: 'https://asset-images.messari.io/images/4b474270-99ba-4a18-869d-11cd3fc0201a/128.png',
			chainId: 80_001,
			decimals: 18,
		},
		rpcUrls: _ => ({ http: ['https://endpoints.omniatech.io/v1/matic/mumbai/public'], webSocket: [] }),
	},
	optimismGoerli: {
		contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
		gasToken: {
			address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
			chainId: 5,
			decimals: 18,
			name: 'OP Goerli Ether',
			symbol: 'ETH',
			logoURI: 'https://ethereum-optimism.github.io/data/ETH/logo.svg˛',
		},
		rpcUrls: _ => ({ http: [''], webSocket: [] }),
	},
	avalancheFuji: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		gasToken: {
			address: '0x0100000000000000000000000000000000000001',
			decimals: 18,
			symbol: 'AVAX',
			name: 'Avalanche',
			chainId: 43_113,
			logoURI: 'https://asset-images.messari.io/images/e5661483-5cd1-4416-a09a-6c7466310442/128.png',
		},
		rpcUrls: environment => ({
			http: [
				'https://api.avax-test.network/ext/bc/C/rpc',
				`https://rpc.ankr.com/avalanche_fuji/${environment.ANKR_API_KEY}`,
			],
			webSocket: [],
		}),
	},
	fantomTestnet: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		gasToken: {
			address: '0x0100000000000000000000000000000000000001',
			decimals: 18,
			symbol: 'FTM',
			name: 'Fantom',
			chainId: 4_002,
			logoURI: 'https://s3.coinmarketcap.com/static/img/portraits/62d51d9af192d82df8ff3a83.png',
		},
		rpcUrls: _ => ({ http: ['https://rpc.testnet.fantom.network'], webSocket: [] }),
	},
	arbitrumGoerli: {
		contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
		gasToken: {
			address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
			chainId: 5,
			decimals: 18,
			name: 'Arbitrum Goerli Ether',
			symbol: 'ETH',
			logoURI: 'https://ethereum-optimism.github.io/data/ETH/logo.svg˛',
		},
		rpcUrls: _ => ({
			http: ['https://goerli.arbitrum.io/rpc'],
			webSocket: [],
		}),
	},
	baseGoerli: {
		contract: '0x4a54047B53C5B011b00AcBdec84c090e6Cc175E2',
		gasToken: {
			address: '0x0000000000000000000000000000000000000000',
			chainId: 84_531,
			decimals: 18,
			name: 'Base Goerli Ether',
			symbol: 'ETH',
			logoURI: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
		},
		rpcUrls: _ => ({
			http: ['https://goerli.base.org', 'https://goerli.infura.io/v3'],
			webSocket: [],
		}),
	},
} satisfies Record<
	Chain,
	{
		contract: Address
		gasToken: Token
		rpcUrls: (environment: Env) => {
			http: Array<string>
			webSocket: Array<string>
		}
	}
>

const ethCallGasLimit = {
	llamanode: 2_000_000,
	alchemy: 5_000_000,
}

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
