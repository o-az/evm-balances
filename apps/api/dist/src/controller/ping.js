"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
async function ping(fastify) {
    fastify.get('/ping', async function (request, reply) {
        const { ping } = request.params;
        reply.status(200).send({ ping: 'pong' });
    });
}
exports.ping = ping;
