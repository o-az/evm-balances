import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { sentry } from '@hono/sentry'
import { validator } from 'hono/validator'
import { HTTPException } from 'hono/http-exception'
import { type Address, isAddress, formatUnits } from 'viem'
import { ERC20_ABI } from './constants/abi'
import { publicClient } from './client'
import type { Chain, Environment, Token } from './types'
import { balancesOf, multicallBalancesOf } from './read-contract'
import { setMiddleware } from './middleware'
import { chains, invalidResponse } from './constants'
import { getChainToken, getChainTokens } from './tokens'

const app = new Hono<{ Bindings: Environment }>()

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
	if (error instanceof HTTPException) return error.getResponse()
	return context.json({ message: error.message }, 500)
})

app.get('/env', context => {
	const environmentVariables = env<Environment>(context)
	if (environmentVariables['NODE_ENV'] !== 'development') return context.json({ NODE_ENV: 'production' }, 200)
	return context.text(JSON.stringify(environmentVariables, undefined, 2))
})

app.get('/error', context => {
	console.log({
		path: context.req.path,
		url: context.req.url,
		error: context.error,
	})
	return context.json({ message: 'ok' })
})

/* TODO Auth */
app.post('/auth', async (_, next) => {
	const authorized = true
	if (!authorized) throw new HTTPException(401, { res: new Response('Unauthorized', { status: 401 }) })
	await next()
})

app.get('/routes', context => {
	app.showRoutes() // <-- this logs routes to console
	return context.json(app.routes)
})

app.get('/chains', context => context.json(Object.keys(chains)))
app.get('/supported-chains', context => context.json(Object.keys(chains)))

app.on(
	['GET', 'POST'],
	'/chain/:chain/address/:address',
	validator('param', (value, context) => {
		const { chain, address } = <{ chain: Chain; address: Address }>value

		if (!chains[chain]) return context.json(invalidResponse['chain'], 404)
		if (!isAddress(address)) return context.json(invalidResponse['walletAddress'], 400)

		return { chain, address }
	}),
	async context => {
		try {
			const { chain, address } = context.req.valid('param')
			const tokens = await getChainTokens(chain)

			const client = publicClient(chain, { env: context.env, options: { batch: { multicall: false } } })
			const arguments_ = {
				client,
				chain,
				address,
				tokens,
			}
			// TODO: multicall
			// const balances = await multicallBalancesOf(arguments_)
			const balances = await balancesOf(arguments_)

			return context.text(JSON.stringify(balances, undefined, 2))
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : error
			console.error(errorMessage)
			return context.json({ ok: false, message: errorMessage }, 500)
		}
	}
)

app.get(
	'/chain/:chain/token/:token/:address',
	validator('param', (value, context) => {
		const { chain, token, address } = <{ chain: Chain; token: Address; address: Address }>value
		if (!chains[chain]) return context.json(invalidResponse['chain'], 404)
		if (!isAddress(token)) return context.json(invalidResponse['tokenAddress'], 400)
		if (!isAddress(address)) return context.json(invalidResponse['walletAddress'], 400)
		return { chain, token, address }
	}),
	async context => {
		const { chain, token, address } = context.req.valid('param')
		const fetchedToken = await getChainToken(chain, token)
		const client = publicClient(chain, { env: context.env })

		const balance = await client.readContract({
			address: fetchedToken.address,
			abi: ERC20_ABI,
			functionName: 'balanceOf',
			args: [address],
		})
		return context.json({
			balance: Object.hasOwn(fetchedToken, 'decimals')
				? formatUnits(balance, (fetchedToken as Token).decimals)
				: balance,
			...fetchedToken,
		})
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

const port = 8_787

console.info(`\n🚀 Server ready at http://0.0.0.0:${port}\n`)

export default {
	port,
	fetch: app.fetch,
}
