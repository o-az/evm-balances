import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { getTokensBalances } from '@/chain/balance'
import type { PathParams, QueryParams } from '@/types'

interface PingGETRequest extends FastifyRequest {
  Params: { ping: string }
}

export async function ping(fastify: FastifyInstance) {
  // GET /
  fastify.get<PingGETRequest>('/ping', async function (request, reply: FastifyReply) {
    const { ping } = request.params

    reply.status( 200).send({ ping: 'pong' })
  })
}
