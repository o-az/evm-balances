import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';

interface DocumentationRequest extends FastifyRequest {
  Params: { docs: string };
}

export async function getDocumentation(fastify: FastifyInstance) {
  // GET /
  fastify.get<DocumentationRequest>('/docs', async function (request, reply: FastifyReply) {
    // redirect to ReDoc for now until a lit doc is ready
    reply.redirect(
      `https://redocly.github.io/redoc/?url=https://evm-balances-api.fly.dev/docs/json`
    );
    // reply.header('Content-Type', 'text/html')
    // reply.status(200).send(someHtmlPage)
  });
}
