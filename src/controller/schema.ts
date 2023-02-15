import { type FastifyInstance, type FastifyReply } from 'fastify';
import schema from '@/schema/schema.json' assert { type: 'json' };

export async function getSchema(fastify: FastifyInstance) {
  // GET /
  fastify.get('/schema.json', async function (request, reply: FastifyReply) {
    reply.send(schema);
  });
}
