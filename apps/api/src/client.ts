import * as viemChain from 'viem/chains'
import { createPublicClient, fallback, http } from 'viem'

import type { Chain } from './types.js'
import { rpcUrls } from './constants/index.js'
import { milliseconds, seconds } from './utilities.js'

type PublicClientOptions = Pick<Parameters<typeof createPublicClient>[0], 'batch' | 'key' | 'pollingInterval'>

export function publicClient(
  _chain: Chain,
  {
    env,
    options = {
      // defaults
      pollingInterval: seconds(4),
      batch: {
        multicall: {
          batchSize: 5_000,
          wait: milliseconds(0),
        },
      },
    },
  }: {
    env: Env
    options?: PublicClientOptions
  },
): ReturnType<typeof createPublicClient> {
  const httpTransports = rpcUrls(_chain, env)['http'].map(url =>
    http(url, {
      key: `HTTP Transport [${_chain}]`,
      name: `HTTP JSON-RPC [${_chain}]`,
      retryCount: 3,
      retryDelay: seconds(0.125),
      timeout: seconds(10),
      batch: true,
    }),
  )

  return createPublicClient({
    chain: viemChain[
      _chain === 'ethereum' ? 'mainnet' : _chain === 'harmony' ? 'harmonyOne' : _chain
    ] as viemChain.Chain,
    name: `Public Client [${_chain}]`,
    transport: fallback(httpTransports),
    ...options,
  })
}
