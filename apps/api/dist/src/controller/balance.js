"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = void 0;
const balance_1 = require("../chain/balance");
const schema_1 = require("../schema");
async function getBalance(fastify) {
    fastify.get('/balance/:chain/:address', { schema: schema_1.balanceSchema }, async function (request, reply) {
        const { chain, address } = request.params;
        const { token } = request.query;
        const { balances, error } = await (0, balance_1.getTokensBalances)({
            address,
            chain,
            tokens: [token],
        });
        reply.status(error ? 400 : 200).send({ error, balances });
    });
}
exports.getBalance = getBalance;
