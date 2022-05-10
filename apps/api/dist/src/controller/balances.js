"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificBalances = exports.getBalances = void 0;
const balance_1 = require("../chain/balance");
const schema_1 = require("../schema");
async function getBalances(fastify) {
    fastify.get('/balances/:chain/:address', { schema: schema_1.balancesSchema }, async function (request, reply) {
        const { chain, address } = request.params;
        const { balances, error } = await (0, balance_1.getTokensBalances)({ address, chain });
        reply.status(error ? 400 : 200).send({ error, balances });
    });
}
exports.getBalances = getBalances;
async function getSpecificBalances(fastify) {
    fastify.post('/balances/:chain/:address', { schema: schema_1.specificBalancesSchema }, async function (request, reply) {
        const { chain, address } = request.params;
        const { body: tokens } = request;
        const { balances, error } = await (0, balance_1.getTokensBalances)({
            address,
            chain,
            tokens,
        });
        reply.status(error ? 400 : 200).send({ error, balances });
    });
}
exports.getSpecificBalances = getSpecificBalances;
