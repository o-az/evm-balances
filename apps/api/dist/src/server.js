"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const server = (0, fastify_1.default)({ logger: config_1.loggerConfig });
server.register(routes_1.router);
exports.default = server;
