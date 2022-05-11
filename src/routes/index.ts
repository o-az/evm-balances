import { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import fastifyCors from '@fastify/cors'
import { OpenAPIV3 } from 'openapi-types'

import { ping, getBalance, getBalances, getSpecificBalances, getDocs } from '@/controller'
import schema from '@/schema/schema.json'

const OPEN_API_SCHEMA = schema as Partial<OpenAPIV3.Document>

// Register swagger then all the routes
export async function router(fastify: FastifyInstance) {
  // CORS
  fastify.register(fastifyCors, { origin: true, methods: ['GET', 'POST'] })
  // DOCS
  fastify.register(getDocs, { prefix: '' })
  // SWAGGER (may get rid of this)
  fastify.register(swagger, { routePrefix: 'swagger', exposeRoute: true, openapi: OPEN_API_SCHEMA })
  // PING
  fastify.register(ping, { prefix: '' })
  // CORE: BALANCE
  fastify.register(getBalance, { prefix: '' })
  fastify.register(getBalances, { prefix: '' })
  fastify.register(getSpecificBalances, { prefix: '' })
}
