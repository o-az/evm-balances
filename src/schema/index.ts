import { FastifySchema } from 'fastify'
import { chains } from '@/chain/constants'
import { POSSIBLE_CHAIN_NAMES } from '@/chain/mapper'

const baseSchema: FastifySchema = {
  params: {
    type: 'object',
    additionalProperties: false,
    errorMessage: 'Invalid params; expected { chain: "polygon-mainnet", address: "0x..." }',
    required: ['chain', 'address'],
    properties: {
      chain: {
        type: 'string',
        enum: POSSIBLE_CHAIN_NAMES,
      },
      address: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        error: { type: ['string', 'null'] },
        additonalProperties: false,
        balances: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              address: { type: 'string' },
              balance: { type: 'integer' },
              name: { type: 'string' },
              symbol: { type: 'string' },
              decimals: { type: 'integer' },
            },
          },
        },
      },
    },
    400: {
      type: 'object',
      properties: {
        error: { type: ['string', 'null'] },
        additonalProperties: false,
        balances: {
          type: 'array',
          items: { type: 'object' },
        },
      },
    },
  },
}

const balancesSchema: FastifySchema = { ...baseSchema }

const specificBalancesSchema: FastifySchema = {
  ...baseSchema,
  body: {
    type: 'array',
    items: { type: 'string' },
  },
}

const balanceSchema: FastifySchema = {
  ...baseSchema,
  querystring: {
    type: 'object',
    additionalProperties: false,
    errorMessage: 'Invalid querystring; expected { token: "0x..." }',
    properties: {
      token: { type: 'string' },
    },
  },
}

export { balancesSchema, specificBalancesSchema, balanceSchema }
