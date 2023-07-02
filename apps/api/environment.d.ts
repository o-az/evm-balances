interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: string
  SENTRY_DSN: string
  // Cloudflare Workers default environment variables
  CLOUDFLARE_API_BASE_URL: string
  LLAMANODES_API_KEY: string
  ANKR_API_KEY: string
  CHAINNODES_API_KEY: string
}

/** Node.js */
declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}

/** Cloudflare Workers */
interface Env extends EnvironmentVariables {}
