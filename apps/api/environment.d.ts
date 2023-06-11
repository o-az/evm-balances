interface EnvironmentVariables {
	NODE_ENV: 'development' | 'production' | 'test'
	PORT: string
	LLAMANODES_API_KEY: string
	SENTRY_DSN: string
	// Cloudflare Workers default environment variables
	CLOUDFLARE_API_BASE_URL: string
}

/** Node.js */
declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvironmentVariables {}
	}
}

/** Cloudflare Workers */
interface Env extends EnvironmentVariables {}
