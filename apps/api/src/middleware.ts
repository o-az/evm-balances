import type { Env, Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'

export function setMiddleware(app: Hono<Env, {}, '/v1'>) {
	const middleware = [
		poweredBy(),
		logger(_ => console.info('Request:', _)),
		cors({ origin: '*' }),
		prettyJSON({ space: 2 }),
	]
	middleware.forEach(_ => app.use('*', _))
}
