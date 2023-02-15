import { type FastifyLoggerOptions } from 'fastify';
import 'dotenv/config';

export const ENV_VARIABLES = {
  INFURA_KEY: process.env.INFURA_KEY,
};

const development = process.env.NODE_ENV !== 'production';

export const loggerConfig: FastifyLoggerOptions = {
  level: development ? 'debug' : 'info',
};
