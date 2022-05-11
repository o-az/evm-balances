import { FastifyLoggerOptions } from "fastify"
import "dotenv/config"

export const ENV_VARIABLES = {
	INFURA_KEY: process.env.INFURA_KEY
}

const dev = process.env.NODE_ENV !== "prodction"

export const loggerConfig: FastifyLoggerOptions = {
	level: dev ? "debug" : "info",
	prettyPrint: dev
		? {
				colorize: true,
				translateTime: "yyyy-mm-dd-hh:MM:ss Z",
				ignore: ["pid", "hostname"].join(",")
		  }
		: false
}
