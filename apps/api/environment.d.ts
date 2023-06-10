interface EnvironmentVariables {
	NODE_ENV: 'development' | 'production' | 'test'
	PORT: string
	LLAMANODES_API_KEY: string
	SENTRY_DSN: string
}

// Node.js
namespace NodeJS {
	interface ProcessEnv extends EnvironmentVariables {}
}

// Bun
interface Env extends EnvironmentVariables {}
