import { createPublicClient, http, fallback } from 'viem'
import * as chain from 'viem/chains'
import { chains, type Chain } from './constants'

export const publicClient = (_chain: Chain) =>
	createPublicClient({
		chain: chain[_chain],
		transport: fallback(chains[_chain]['rpcUrls'].map(url => http(url))),
		batch: {
			multicall: {
				batchSize: 1024,
				wait: 0,
			},
		},
	})
