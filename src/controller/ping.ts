import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';

interface PingGETRequest extends FastifyRequest {
  Params: { ping: string };
}

export async function ping(fastify: FastifyInstance) {
  // GET /
  fastify.get<PingGETRequest>('/ping', async function (_, reply: FastifyReply) {
    reply.status(200).send({ ping: 'pong' });
  });
}
