import type { Address, Chain as _Chain } from 'viem'
import type { Chain, Token } from '#/types'
import { formatRPC, strictFormatRPC } from '#/utilities'

export const rpcUrls = (chain: Chain, environment: Env) => chains[chain].rpcUrls(environment)

interface ChainProperties {
  chainId: number
  contract: Address
  gasToken: Token
  rpcUrls: (environment: Env) => {
    http: Array<string>
    webSocket: Array<string>
  }
}

export const chainsTuples = [
  ['ethereum', 1],
  ['optimism', 10],
  ['gnosis', 100],
  ['arbitrum', 42_161],
  ['polygon', 137],
  ['celo', 42_220],
  ['moonbeam', 1_284],
  ['avalanche', 43_114],
  ['fantom', 250],
  ['bsc', 56],
  ['harmony', 1_666_600_000],
] as const satisfies ReadonlyArray<Readonly<[Chain, number]>>

export type ChainID = (typeof chainsTuples)[number][1]

/**
 * Object containing contract addresses and RPC URLs for each supported chain.
 */
export const chains = {
  ethereum: {
    chainId: 1,
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
    chainId: 1,
    contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
    gasToken: {
      address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
      name: 'xDai',
      symbol: 'xDAI',
      decimals: 18,
      chainId: 100,
      logoURI: 'https://docs.gnosischain.com/img/tokens/xdai.png',
    },
    rpcUrls: environment => ({
      http: [`https://rpc.ankr.com/gnosis/${environment.ANKR_API_KEY}`],
      webSocket: [],
    }),
  },
  polygon: {
    contract: '0x8b08FE6F8443f7bBbEde50Ecc8B020d9e44997a2',
    chainId: 137,
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
    chainId: 10,
    gasToken: {
      address: '0x0000000000000000000000000000000000001010',
      decimals: 18,
      symbol: 'ETH',
      name: 'Optimism Ether',
      logoURI: 'https://ethereum-optimism.github.io/data/ETH/logo.svg',
      chainId: 10,
    },
    rpcUrls: environment => ({
      http: [`https://rpc.ankr.com/optimism/${environment.ANKR_API_KEY}`],
      webSocket: [],
    }),
  },
  celo: {
    contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
    chainId: 42_220,
    gasToken: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
      address: '0x471EcE3750Da237f93B8E339c536989b8978a438',
      chainId: 42_220,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5567.png',
    },
    rpcUrls: environment => ({
      http: [`https://rpc.ankr.com/celo/${environment.ANKR_API_KEY}`],
      webSocket: [],
    }),
  },
  moonbeam: {
    contract: '0x5D88da6682B9088B9e31c900Be850de20cF20B11',
    chainId: 1_284,
    gasToken: {
      address: '0x0000000000000000000000000000000000000802',
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18,
      chainId: 1_284,
      logoURI: 'https://stakingcrypto.info/static/assets/coins/moonbeam-logo.png',
    },
    rpcUrls: environment => ({
      http: [`https://rpc.ankr.com/moonbeam/${environment.ANKR_API_KEY}`],
      webSocket: [],
    }),
  },
  avalanche: {
    contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
    chainId: 43_114,
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
    chainId: 250,
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
    chainId: 56,
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
  arbitrum: {
    contract: '0x77e883446e4cDE8955b4ce07DfCf0E9887B0e66c',
    chainId: 42_161,
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
  harmony: {
    contract: '0xc9bA77C9b27481B6789840A7C3128D4f691f8296',
    chainId: 1_666_600_000,
    gasToken: {
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: 'ONE',
      name: 'One',
      chainId: 1_666_600_000,
      logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
    },
    rpcUrls: environment => ({
      http: [`https://rpc.ankr.com/harmony/${environment.ANKR_API_KEY}`, 'https://api.s0.t.hmny.io'],
      webSocket: [],
    }),
  },
} as const satisfies Record<Chain, ChainProperties>
