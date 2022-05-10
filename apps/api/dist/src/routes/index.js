"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const swagger_1 = __importDefault(require("@fastify/swagger"));
const controller_1 = require("../controller");
const schema_json_1 = __importDefault(require("../schema/schema.json"));
const OPEN_API_SCHEMA = schema_json_1.default;
async function router(fastify) {
    fastify.register(swagger_1.default, {
        routePrefix: "docs",
        exposeRoute: true,
        openapi: OPEN_API_SCHEMA
    });
    fastify.register(controller_1.ping, { prefix: "" });
    fastify.register(controller_1.getBalance, { prefix: "" });
    fastify.register(controller_1.getBalances, { prefix: "" });
    fastify.register(controller_1.getSpecificBalances, { prefix: "" });
}
exports.router = router;
