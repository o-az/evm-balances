export * from './chains'
export * from './abi'

export const ethCallGasLimit = {
  llamanode: 2_000_000,
  alchemy: 5_000_000,
}

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
