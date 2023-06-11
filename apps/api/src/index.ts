import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { validator } from 'hono/validator'
import { isAddress, type Address } from 'viem'
import { HTTPException } from 'hono/http-exception'
import { sentry } from '@hono/sentry'
import { publicClient } from './client'
import type { Environment } from './types'
import { balancesOf } from './read-contract'
import { setMiddleware } from './middleware'
import { chains, type Chain, invalidResponse } from './constants'

const app = new Hono<{
	Bindings: {
		NODE_ENV: 'development' | 'production' | 'test'
		PORT: string
		SENTRY_DSN: string
		LLAMANODES_API_KEY: string
		// Cloudflare Workers default environment variables
		CLOUDFLARE_API_BASE_URL: string
	}
}>().basePath('/v1')

app.use('*', async (context, next) => {
	sentry(
		{
			dsn: context.env['SENTRY_DSN'],
			environment: context.env['NODE_ENV'],
			debug: context.env['NODE_ENV'] === 'development',
		},
		sentry => {
			if (context.error) {
				sentry.captureMessage('Sentry caught an error"')
				sentry.captureException(context.error)
			}
		}
	)
	return next()
})

app.get('/', async _ => new Response('ok', { status: 200 }))

setMiddleware(app)

app.notFound(() => new Response('Not Found', { status: 404, statusText: 'Not Found' }))

app.on(['GET', 'POST'], '/healthz', () => new Response('ok', { status: 200 }))

app.onError((error, context) => {
	console.error(`-- app.onError [${context.req.url}]: ${error}`, context.error)
	if (error instanceof HTTPException) {
		return error.getResponse()
	}
	return context.json(
		{
			message: `THIS IS A CUSTOM ERROR MESSAGE - ${error.message}`,
		},
		500
	)
})

app.get('/env', context => {
	const environmentVariables = env<Environment>(context)
	if (environmentVariables['NODE_ENV'] !== 'development') {
		console.log(JSON.stringify(process.env, undefined, 2))
		return context.json(
			{
				NODE_ENV: 'production',
			},
			200
		)
	}
	return context.text(JSON.stringify(environmentVariables, undefined, 2))
})

app.on(['GET', 'POST'], '/tmp', async context => {
	const client = publicClient('mainnet', context.env)
	const blockNumber = await client.getBlockNumber()

	return context.json({ blockNumber }, 200)
})

app.get('/error', context => {
	console.log('/error\n\n')
	console.log({
		path: context.req.path,
		url: context.req.url,
		error: context.error,
	})
	return context.json({
		message: 'ok',
	})
})

app.post('/auth', async (_, next) => {
	/* TODO Auth */
	const authorized = true
	if (!authorized)
		throw new HTTPException(401, {
			res: new Response('Unauthorized', {
				status: 401,
			}),
		})
	await next()
})

app.get('/routes', context => {
	app.showRoutes() // <-- this logs routes to console
	return context.json(app.routes)
})

app.get('/chains', context => context.json(Object.keys(chains)))
app.get('/supported-chains', context => context.json(Object.keys(chains)))

app.post(
	'/_chain/:chain/:address',
	validator('param', (value, context) => {
		if (
			![
				// 'GET',
				'POST',
			].includes(context.req.method)
		) {
			return context.json(
				{
					ok: false,
					message: 'Only POST allowed',
				},
				405
			)
		}
		const { chain, address } = <
			{
				chain: Chain
				address: Address
			}
		>value

		if (!chains[chain]) return context.json(invalidResponse['chain'], 404)
		if (!isAddress(address)) return context.json(invalidResponse['walletAddress'], 400)

		return {
			chain,
			address,
		}
	}),
	async context => {
		try {
			const { chain, address } = context.req.valid('param')
			const tokens = (await context.req.json()) as Array<Address>

			const client = publicClient(chain, context.env)
			const balances = await balancesOf({
				client,
				chain,
				address,
				tokens,
			})
			return context.json(balances.map(String))
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : error
			console.trace(errorMessage)
			return context.json(
				{
					ok: false,
					message: errorMessage,
				},
				500
			)
		}
	}
)

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
app.post(
	'/chain/:chain/:address',
	validator('param', (value, context) => {
		if (
			![
				// 'GET',
				'POST',
			].includes(context.req.method)
		) {
			return context.json(
				{
					ok: false,
					message: 'Only POST allowed',
				},
				405
			)
		}
		const { chain, address } = <
			{
				chain: Chain
				address: Address
			}
		>value

		if (!chains[chain]) return context.json(invalidResponse['chain'], 404)
		if (!isAddress(address)) return context.json(invalidResponse['walletAddress'], 400)

		return {
			chain,
			address,
		}
	}),
	async context => {
		try {
			const { chain, address } = context.req.valid('param')
			const tokens = (await context.req.json()) as Array<Address>

			const client = publicClient(chain, context.env)
			const balances = await balancesOf({
				client,
				chain,
				address,
				tokens,
			})
			return context.json(balances.map(String))
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : error
			console.trace(errorMessage)
			return context.json(
				{
					ok: false,
					message: errorMessage,
				},
				500
			)
		}
	}
)

app.get(
	'/chain/:chain/token/:token/:address',
	validator('param', (value, context) => {
		const { chain, token, address } = <
			{
				chain: Chain
				token: Address
				address: Address
			}
		>value
		console.log({
			chain,
			token,
			address,
		})
		if (!chains[chain]) return context.json(invalidResponse['chain'], 404)
		if (!isAddress(token)) return context.json(invalidResponse['tokenAddress'], 400)
		if (!isAddress(address)) return context.json(invalidResponse['walletAddress'], 400)
		return {
			chain,
			token,
			address,
		}
	}),
	async context => {
		const { chain, token, address } = context.req.valid('param')
		const client = publicClient(chain, context.env)
		const balance = await balancesOf({
			client,
			chain,
			address,
			tokens: [token],
		})
		return context.json(balance.map(String))
	}
)

/**
 * TODO
 * Multiple chains
 */
app.all(
	'/multichain/:address',
	validator('param', (value, context) => {
		if (
			![
				// 'GET',
				'POST',
			].includes(context.req.method)
		) {
			return context.json(
				{
					ok: false,
					message: 'Only POST allowed',
				},
				405
			)
		}
		const { address } = <
			{
				address: Address
			}
		>value
		if (!isAddress(address)) return context.json(invalidResponse['walletAddress'], 400)
		return {
			address,
		}
	}),
	validator('queries', (value, context) => {
		const { chain } = <
			{
				chain: Array<Chain>
			}
		>value
		if (!chain.every(chain => chains[chain])) return context.json(invalidResponse['chain'], 404)
		return {
			chain,
		}
	}),
	async context => {
		const { address } = context.req.valid('param')
		const { chain } = context.req.valid('queries')
		const tokens = (await context.req.json()) as Array<Address>

		return context.text('Not implemented yet', 501)
	}
)

const port = 3_033

console.info(`\n🚀 Server ready at http://0.0.0.0:${port}\n`)

export default {
	port,
	fetch: app.fetch,
}
