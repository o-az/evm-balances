import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';

const baseURL =
  process.env.FLY_APP_NAME && process.env.FLY_APP_NAME.length > 0
    ? 'https://evm-balances-api.fly.dev'
    : 'http://localhost:8080';

interface DocumentationRequest extends FastifyRequest {
  Params: { docs: string };
}

export async function getDocumentation(fastify: FastifyInstance) {
  // GET /
  fastify.get<DocumentationRequest>('/docs', async function (_, reply: FastifyReply) {
    reply.redirect(`https://redocly.github.io/redoc/?url=${baseURL}/schema.json`);
  });
}
