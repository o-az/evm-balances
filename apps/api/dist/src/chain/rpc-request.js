"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpcRequest = void 0;
const config_1 = require("../config");
const mapper_1 = require("./mapper");
const KEY = config_1.ENV_VARIABLES.INFURA_KEY;
async function rpcRequest({ from, to, data, chain }) {
    try {
        const url = (0, mapper_1.networkUrl)({ chain, infuraKey: config_1.ENV_VARIABLES.INFURA_KEY });
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_call',
                params: [{ from, to, data }, 'latest'],
            }),
        });
        if (!response.ok) {
            throw new Error(`Response not ok: ${response.status} - ${response.statusText}`);
        }
        const json = await response.json();
        if (json.error || !json.result) {
            throw new Error(`JSON error: ${JSON.stringify(json)}`);
        }
        return json.result;
    }
    catch (error) {
        console.trace(error);
        return null;
    }
}
exports.rpcRequest = rpcRequest;
