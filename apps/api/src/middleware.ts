import type { Env, Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { sentry } from '@hono/sentry'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'
import { environment } from './environment'

export function setMiddleware(app: Hono<Env, {}, '/v1'>) {
	const middleware = [
		sentry(
			{
				dsn: environment('SENTRY_DSN'),
				environment: environment('NODE_ENV'),
				debug: environment('NODE_ENV') === 'development',
			},
			sentry => {
				sentry.captureMessage('Sentry caught an error')
			}
		),
		poweredBy(),
		logger(_ => console.info('Request:', _)),
		cors({ origin: '*' }),
		prettyJSON({ space: 2 }),
	]
	middleware.forEach(_ => app.use('*', _))
}
