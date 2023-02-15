import Fastify from 'fastify';
import { loggerConfig } from './config';
import { router } from './routes';

const server = Fastify({ logger: loggerConfig });

// Middleware: Router
server.register(router);
export default server;
