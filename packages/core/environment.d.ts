declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    DEPLOYED_CONTRACT: string
    RPC_URL: string
    KEY: string
    ETHERSCAN_API_KEY: string
    POLYGONSCAN_API_KEY: string
    OPTIMISTIC_ETHSCAN_API_KEY: string
  }
}
