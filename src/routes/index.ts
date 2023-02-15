import { type FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';

import {
  getBalance,
  getBalances,
  getDocumentation,
  getSchema,
  getSpecificBalances,
  ping,
} from '@/controller';

// const OPEN_API_SCHEMA = schema as Partial<OpenAPIV3.Document>;

// Register swagger then all the routes
export async function router(fastify: FastifyInstance) {
  // CORS
  fastify.register(fastifyCors, { origin: true, methods: ['GET', 'POST'] });
  // SCHEMA
  fastify.register(getSchema, { prefix: '' });
  // DOCS
  fastify.register(getDocumentation, { prefix: '' });
  // PING
  fastify.register(ping, { prefix: '' });
  // CORE: BALANCE
  fastify.register(getBalance, { prefix: '' });
  fastify.register(getBalances, { prefix: '' });
  fastify.register(getSpecificBalances, { prefix: '' });
}
