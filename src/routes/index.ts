import { type FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import fastifyCors from '@fastify/cors';
import { type OpenAPIV3 } from 'openapi-types';

import { getBalance, getBalances, getDocumentation, getSpecificBalances, ping } from '@/controller';
import schema from '@/schema/schema.json' assert { type: 'json' };

const OPEN_API_SCHEMA = schema as Partial<OpenAPIV3.Document>;

// Register swagger then all the routes
export async function router(fastify: FastifyInstance) {
  // CORS
  fastify.register(fastifyCors, { origin: true, methods: ['GET', 'POST'] });
  // // DOCS
  fastify.register(getDocumentation, { prefix: '' });
  // // SWAGGER (may get rid of this)
  fastify.register(swagger, {
    prefix: 'swagger',
    openapi: OPEN_API_SCHEMA,
  });
  // PING
  fastify.register(ping, { prefix: '' });
  // // CORE: BALANCE
  fastify.register(getBalance, { prefix: '' });
  fastify.register(getBalances, { prefix: '' });
  fastify.register(getSpecificBalances, { prefix: '' });
}
