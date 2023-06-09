import type { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'

import { compress } from 'hono/compress'
import { cache } from 'hono/cache'

export function middleware(app: Hono) {
	app.use(
		'*',
		logger(_ => console.info('Request:', _))
	)

	app.use('*', prettyJSON({ space: 2 }))

	app.use('*', cors({ origin: '*' }))

	app.use(
		'*',
		sentry({
			environment: process.env.NODE_ENV,
			dsn: process.env.SENTRY_DSN,
			debug: true,
		})
	)
}
