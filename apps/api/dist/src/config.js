"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConfig = exports.ENV_VARIABLES = void 0;
require("dotenv/config");
exports.ENV_VARIABLES = {
    INFURA_KEY: process.env.INFURA_KEY
};
const dev = process.env.NODE_ENV !== "prodction";
exports.loggerConfig = {
    level: dev ? "debug" : "info",
    prettyPrint: dev
        ? {
            colorize: true,
            translateTime: "yyyy-mm-dd-hh:MM:ss Z",
            ignore: ["pid", "hostname"].join(",")
        }
        : false
};
