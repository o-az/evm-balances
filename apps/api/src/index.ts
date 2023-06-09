import 'dotenv/config'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { isAddress, type Address } from 'viem'
import { publicClient } from './client'
import { middleware } from './middleware'
import { balancesOf } from './read-contract'
import { chains, type Chain, invalidResponse } from './constants'

const app = new Hono()

middleware(app)

app.notFound(context => context.json({ message: 'Not found' }, 404))

app.onError((error, context) => context.json({ message: error.message }, 500))

app.get('/', async context => context.json({ message: 'ok' }))

app.get('/chains', context => context.json(Object.keys(chains)))
app.get('/supported-chains', context => context.json(Object.keys(chains)))

/**
 * /:chain/:address
 *
 *```sh
 * curl --request POST \
 *   --url 'http://localhost:3033/mainnet/0xf4212614C7Fe0B3feef75057E88b2E77a7E23e83' \
 *   --header 'content-type: application/json' \
 *   --data '["0x7aE1D57b58fA6411F32948314BadD83583eE0e8C"]'
 * ```
 */
app.all(
	'/:chain/:address',
	validator('param', (value, context) => {
		if (!['GET', 'POST'].includes(context.req.method)) {
			return context.json({ success: false, message: 'Only GET and POST allowed' }, 405)
		}
		const { chain, address } = <{ chain: Chain; address: Address }>value

		if (!chains[chain]) return context.json(invalidResponse['chain'], 404)
		if (!isAddress(address)) return context.json(invalidResponse['walletAddress'], 400)

		return { chain, address }
	}),
	async context => {
		try {
			const { chain, address } = context.req.valid('param')
			const tokens = (
				context.req.method === 'POST'
					? await context.req.json()
					: // TODO: add tokens
					  ['0x7aE1D57b58fA6411F32948314BadD83583eE0e8C']
			) as Array<Address>

			const client = publicClient(chain)
			const balances = await balancesOf({ client, chain, address, tokens })
			return context.json(balances.map(String))
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : error
			console.trace(errorMessage)
			return context.json({ success: false, message: errorMessage }, 500)
		}
	}
)

/**
 * TODO
 * Multiple chains
 */
app.all('/multiple/:address', async context => {
	const { address } = <{ address: Address }>context.req.param()
	// /multiple/0x00?chain=mainnet&chain=arbitrum
	const chain = context.req.queries('chain') as Array<Chain>

	return context.text('Not implemented yet', 501)
})

const port = Number.parseInt(process.env.PORT) || 3033
console.log(`Running at http://localhost:${port}`)

export default {
	port,
	fetch: app.fetch,
}
