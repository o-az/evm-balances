declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test'
		PORT: string
		LLAMANODES_API_KEY: string
		SENTRY_DSN: string
	}
}
