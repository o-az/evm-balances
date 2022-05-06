import { FastifyInstance } from "fastify"
import swagger from "@fastify/swagger"
import { OpenAPIV3 } from "openapi-types"
import {
	ping,
	getBalance,
	getBalances,
	getSpecificBalances
} from "@/controller"
import schema from "@/openapi/schema.json"

const OPEN_API_SCHEMA = schema as Partial<OpenAPIV3.Document>

// Register swagger then all the routes
export async function router(fastify: FastifyInstance) {
	/** NOTE: Swagger has to be registered first otherwise docs won't work */
	fastify.register(swagger, {
		routePrefix: "docs",
		exposeRoute: true,
		openapi: OPEN_API_SCHEMA
	})
	// fastify.register(
	// 	(instance, opts, next) => {
	// 		next()
	// 	},
	// 	{ prefix: "/" }
	// )
	fastify.register(ping, { prefix: "" })
	fastify.register(getBalance, { prefix: "" })
	fastify.register(getBalances, { prefix: "" })
	fastify.register(getSpecificBalances, { prefix: "" })
}
