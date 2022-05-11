import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { getTokensBalances } from '@/chain/balance'
import { balanceSchema } from '@/schema'
import type { PathParams, QueryParams } from '@/types'

interface IBalanceRequest extends FastifyRequest {
  Params: PathParams
  Querystring: QueryParams
}

export async function getBalance(fastify: FastifyInstance) {
  // GET /
  fastify.get<IBalanceRequest>(
    '/balance/:chain/:address',
    { schema: balanceSchema },
    async function (request, reply: FastifyReply) {
      const { chain, address } = request.params
      const { token } = request.query
      console.log(token)
      const { balances, error } = await getTokensBalances({
        address,
        chain,
        tokens: [token],
      })
      reply.status(error ? 400 : 200).send({ error, balances })
    }
  )
}