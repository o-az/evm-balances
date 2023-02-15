import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';
import { getTokensBalances } from '@/chain/balance';
import type { PathParameters } from '@/types';
import { balancesSchema, specificBalancesSchema } from '@/schema';

interface IBalancesRequest extends FastifyRequest {
  Params: PathParameters;
}

// checks against top 500 tokens
export async function getBalances(fastify: FastifyInstance) {
  // GET /
  fastify.get<IBalancesRequest>(
    '/balances/:chain/:address',
    { schema: balancesSchema },
    async function (request, reply: FastifyReply) {
      const { chain, address } = request.params;
      const { balances, error } = await getTokensBalances({ address, chain });
      reply.status(error ? 400 : 200).send({ error, balances });
    }
  );
}

interface ISpecificBalancesRequest extends IBalancesRequest {
  Body: Array<string>;
}

// takes an array of contract addresses
export async function getSpecificBalances(fastify: FastifyInstance) {
  // POST /
  fastify.post<ISpecificBalancesRequest>(
    '/balances/:chain/:address',
    { schema: specificBalancesSchema },
    async function (request, reply: FastifyReply) {
      const { chain, address } = request.params;
      const { body: tokens } = request;
      const { balances, error } = await getTokensBalances({
        address,
        chain,
        tokens,
      });
      reply.status(error ? 400 : 200).send({ error, balances });
    }
  );
}
