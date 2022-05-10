import { Chain, MainnetChain, TestnetChain } from '@/types'

const testnetChainIds: Record<TestnetChain, number> = {
  ropsten: 3,
  rinkeby: 4,
  'bsc-testnet': 97,
  'avalance-testnet': 43113,
  'polygon-testnet': 80001,
}

const mainnetChainIds: Record<MainnetChain, number> = {
  bsc: 56,
  ethereum: 1,
  fantom: 250,
  avalanche: 43114,
  optimism: 10,
  arbitrum: 42161,
  polygon: 137,
}

export const chainIds: Record<Chain, number> = {
  ...mainnetChainIds,
  ...testnetChainIds,
}

export const chains = Object.keys(chainIds) as Chain[]
