import {
	FastifyInstance,
	FastifyRequest,
	FastifyReply,
	FastifySchema
} from "fastify"
import { getTokensBalances } from "@/chain/balance"
import type { PathParams, QueryParams } from "@/types"
import { chains } from "@/chain/constants"

const balancesSchema: FastifySchema = {
	params: {
		type: "object",
		additionalProperties: false,
		errorMessage:
			'Invalid params; expected { chain: "polygon-mainnet", address: "0x..." }',
		required: ["chain", "address"],
		properties: {
			chain: {
				type: "string",
				enum: chains
			},
			address: { type: "string" }
		}
	},
	response: {
		200: {
			type: "object",
			properties: {
				error: { type: ["string", "null"] },
				additonalProperties: false,
				balances: {
					type: "array",
					items: {
						type: "object",
						properties: {
							address: { type: "string" },
							balance: { type: "integer" },
							name: { type: "string" },
							symbol: { type: "string" },
							decimals: { type: "integer" }
						}
					}
				}
			}
		},
		400: {
			type: "object",
			properties: {
				error: { type: ["string", "null"] },
				additonalProperties: false,
				balances: {
					type: "array",
					items: { type: "object" }
				}
			}
		}
	}
}

interface IBalancesRequest extends FastifyRequest {
	Params: PathParams
}

// checks against top 500 tokens
export async function getBalances(fastify: FastifyInstance) {
	// GET /
	fastify.get<IBalancesRequest>(
		"/balances/:chain/:address",
		{ schema: balancesSchema },
		async function (request, reply: FastifyReply) {
			const { chain, address } = request.params
			const { balances, error } = await getTokensBalances({ address, chain })
			reply.status(error ? 400 : 200).send({ error, balances })
		}
	)
}

interface ISpecificBalancesRequest extends IBalancesRequest {
	Body: Array<string>
}

// takes an array of contract addresses
export async function getSpecificBalances(fastify: FastifyInstance) {
	// POST /
	fastify.post<ISpecificBalancesRequest>(
		"/balances/:chain/:address",
		{ schema: balancesSchema },
		async function (request, reply: FastifyReply) {
			const { chain, address } = request.params
			const { body: tokens } = request
			const { balances, error } = await getTokensBalances({
				address,
				chain,
				tokens
			})
			reply.status(error ? 400 : 200).send({ error, balances })
		}
	)
}
