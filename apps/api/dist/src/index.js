"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
(async () => {
    try {
        await server_1.default.listen({ port: 8080, host: '0.0.0.0' });
        const address = server_1.default.server.address();
        const port = typeof address === 'string' ? address : address?.port;
        server_1.default.log.info(`server listening on ${port}`);
    }
    catch (error) {
        console.trace(JSON.stringify(error, null, 2));
        process.exit(1);
    }
})();
