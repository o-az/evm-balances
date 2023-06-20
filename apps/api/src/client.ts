import * as chain from 'viem/chains'
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
			batch: { multicall: { batchSize: 1_024, wait: milliseconds(0) } },
		},
	}: {
		env: Env
		options?: PublicClientOptions
	}
) {
	const httpTransports = rpcUrls(_chain, env)['http'].map(url =>
		http(url, {
			key: `HTTP Transport [${_chain}]`,
			name: `HTTP JSON-RPC [${_chain}]`,
			retryCount: 3,
			retryDelay: seconds(0.125),
			timeout: seconds(10),
			batch: options.batch?.multicall,
		})
	)

	const client = createPublicClient({
		chain: chain[_chain],
		name: `Public Client [${_chain}]`,
		transport: fallback(httpTransports, {
			// defaults
			rank: {
				interval: seconds(4),
				sampleCount: 10,
				timeout: seconds(1),
				weights: { latency: 0.3, stability: 0.7 },
			},
		}),
		...options,
	})
	return client
}
