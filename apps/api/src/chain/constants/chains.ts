import { Chain, MainnetChain, TestnetChain } from '@/types'

const testnetChainIds: Record<TestnetChain, number> = {
  ropsten: 3,
  rinkeby: 4,
  bsctestnet: 97,
  'polygon-mumbai': 80001,
}

const mainnetChainIds: Record<MainnetChain, number> = {
  ethereum: 1,
  bsc: 56,
  avalanche: 43114,
  'polygon-mainnet': 137,
  fantom: 250,
  optimism: 10,
  arbitrum: 42161,
}

export const chainIds: Record<Chain, number> = {
  ...mainnetChainIds,
  ...testnetChainIds,
}

export const chains = Object.keys(chainIds) as Chain[]

export const networkUrl = ({ chain, key }: { chain: Chain; key: string }) =>
  chain === 'bsc'
    ? 'https://bsc-dataseed1.binance.org'
    : chain === 'bsctestnet'
    ? 'https://data-seed-prebsc-2-s3.binance.org:8545/'
    : chain === 'avalanche'
    ? 'https://api.avax.network/ext/bc/C/rpc'
    : `https://${chain}.infura.io/v3/${key}`
