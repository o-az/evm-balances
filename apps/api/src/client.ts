import { createPublicClient, http, fallback } from 'viem'
import * as chain from 'viem/chains'
import { type Chain, rpcUrls } from './constants'

export function publicClient(_chain: Chain, environment: Env) {
	const httpTransports = rpcUrls(_chain, environment)['http'].map(url =>
		http(url, {
			key: `HTTP Transport [${_chain}]`,
			name: `HTTP JSON-RPC [${_chain}]`,
			retryCount: 3,
			retryDelay: 125,
			timeout: 10_000,
			batch: {
				batchSize: 1_000,
				wait: 0,
			},
		})
	)
	const client = createPublicClient({
		chain: chain[_chain],
		name: `Public Client [${_chain}]`,
		transport: fallback(httpTransports, {
			rank: true,
		}),
		pollingInterval: 4_000,
		batch: {
			multicall: {
				batchSize: 1_024,
				wait: 0,
			},
		},
	})
	return client
}
