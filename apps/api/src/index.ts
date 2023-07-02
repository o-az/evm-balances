import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { cache } from 'hono/cache'
import { env } from 'hono/adapter'
import { logger } from 'hono/logger'
import { sentry } from '@hono/sentry'
import { validator } from 'hono/validator'
import { prettyJSON } from 'hono/pretty-json'
import { cacheHeader } from 'pretty-cache-header'
import { HTTPException } from 'hono/http-exception'
import { type Address, isAddress } from 'viem'

import { publicClient } from '#/client'
import { balanceOf, userBalances } from '#/balance'
import { isNotFalsy, raise, isFulfilled } from '#/utilities'
import type { Chain, Environment, TokenBalance } from '#/types'
import { getAllTokens, getChainToken, getChainTokens } from '#/tokens'
import { chains, chainsTuples, invalidResponse, type ChainID } from '#/constants'

const app = new Hono<{ Bindings: Environment }>()

app.get(
  '*',
  cache({
    cacheName: '_DEFAULT_',
    cacheControl: cacheHeader({
      maxAge: '6minutes',
      staleIfError: '12hours',
      staleWhileRevalidate: '1year',
    }),
  })
)

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

app.use('*', logger())
app.use('*', async (context, next) => {
  await next()
  context.res.headers.set('X-Powered-By', 'https://github.com/o-az/evm-balances')
})
app.use('*', cors({ origin: '*' }))
app.use('*', prettyJSON({ space: 2 }))

app.get('/', () => new Response('ok', { status: 200 }))

app.notFound(() => new Response('Not Found', { status: 404, statusText: 'Not Found' }))

app.on(['GET', 'POST'], '/healthz', () => new Response('ok', { status: 200 }))

app.onError((error, context) => {
  console.error(`-- app.onError [${context.req.url}]: ${error}`, context.error)
  if (error instanceof HTTPException) return error.getResponse()
  return context.json({ message: error.message }, 500)
})

app.get('/env', context => {
  const environmentVariables = env(context)
  if (environmentVariables['NODE_ENV'] !== 'development') return context.json({ NODE_ENV: 'production' }, 200)
  return context.text(JSON.stringify(environmentVariables, undefined, 2))
})

app.get('/error', context => {
  console.log({ path: context.req.path, url: context.req.url, error: context.error })
  return context.json({ message: 'ok' })
})

/* TODO Auth */
app.post('/auth', async (_, next) => {
  const authorized = true
  if (!authorized)
    throw new HTTPException(401, {
      res: new Response('Unauthorized', { status: 401 }),
    })
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

      const client = publicClient(chain, {
        env: context.env,
      })
      const balances = await userBalances({ client, chain, walletAddress: address, tokens })

      return context.json(
        balances.filter(item => item.balance !== '0'),
        200
      )
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
    const { chain, token, address } = <
      {
        chain: Chain
        token: Address
        address: Address
      }
    >value

    if (!chains[chain]) return context.json(invalidResponse['chain'], 404)
    if (!isAddress(token)) return context.json(invalidResponse['tokenAddress'], 400)
    if (!isAddress(address)) return context.json(invalidResponse['walletAddress'], 400)

    return { chain, token, address }
  }),
  async context => {
    const { chain, token: tokenAddress, address } = context.req.valid('param')
    const { success, data: fetchedToken } = await getChainToken(chain, tokenAddress)

    if (success == false) return context.json({ ok: false, message: 'Token not found' }, 404)

    const client = publicClient(chain, { env: context.env })

    const balance = await balanceOf({ client, walletAddress: address, token: fetchedToken })
    return context.json(balance, 200)
  }
)

/**
 * TODO
 * Multiple chains
 */
app.all(
  '/multichain/:address',
  validator('param', (value, context) => {
    if (!['GET', 'POST'].includes(context.req.method)) {
      return context.json({ ok: false, message: 'Only POST allowed' }, 405)
    }
    const { address } = <{ address: Address }>value
    if (!isAddress(address)) return context.json(invalidResponse['walletAddress'], 400)
    return { address }
  }),
  async context => {
    const { address: walletAddress } = context.req.valid('param')
    const chainsTokens = await getAllTokens()

    const promiseResult = await Promise.allSettled(
      /**
       * Tokens in https://tokens.evm.workers.dev/everything are returned in a specific order
       * The order matches the order of chainsTuples
       */
      chainsTokens.map((tokens, index) => {
        const [chain] = chainsTuples[index] ?? raise('Chain not found')
        return userBalances({
          client: publicClient(chain, { env: context.env }),
          chain,
          walletAddress,
          tokens,
        })
      })
    )

    const fulfilledResults = promiseResult.filter(isFulfilled).flatMap(result => result.value)

    const chainBalances = chainsTuples.reduce((accumulator, [, chainId]) => {
      accumulator[chainId] = []
      return accumulator
    }, {} as Record<ChainID, Array<TokenBalance>>)

    for (const [, tokenBalance] of fulfilledResults.entries()) {
      if (tokenBalance.balance == '0' || !isNotFalsy(tokenBalance)) continue
      chainBalances[tokenBalance.chainId].push(tokenBalance)
    }

    return context.json(chainBalances, 200)
  }
)

const port = 8_787

console.info(`\n🚀 Server ready at http://0.0.0.0:${port}\n`)

export default {
  port,
  fetch: app.fetch,
}
