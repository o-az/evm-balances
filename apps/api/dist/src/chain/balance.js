"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokensBalances = void 0;
const constants_1 = require("../chain/constants");
const rpc_request_1 = require("../chain/rpc-request");
const mapper_1 = require("./mapper");
const METHOD_HASH_SIGNATURE = '0x6a385ae9';
const ETH_ADDRESS_REGEX = /^0x[0-9a-fA-F]{40}$/;
async function getTokensBalances({ address, tokens, chain, }) {
    try {
        if (!ETH_ADDRESS_REGEX.test(address)) {
            throw new Error(`Invalid address: ${address}`);
        }
        if (mapper_1.POSSIBLE_CHAIN_NAMES.indexOf(chain) === -1) {
            throw new Error(`Invalid chain: ${chain}. Must be one of ${mapper_1.POSSIBLE_CHAIN_NAMES.join(', ')}`);
        }
        const mappedChain = (0, mapper_1.mapChain)(chain);
        const _chain = mappedChain.includes('-') ? mappedChain.split('-')[0] : mappedChain;
        const tokenAddresses = tokens ?? (await Promise.resolve().then(() => __importStar(require(`./data/tokens/${_chain}-contracts.json`)))).default;
        const result = await (0, rpc_request_1.rpcRequest)({
            from: '0x0000000000000000000000000000000000000000',
            data: buildCallData({
                address,
                tokens: tokenAddresses,
                method: METHOD_HASH_SIGNATURE,
            }),
            to: constants_1.DEPLOYED_CONTRACTS[mappedChain],
            chain: mappedChain,
        });
        if (!result)
            throw new Error('No result from RPC request');
        const parsedResult = result.replace('0x', '').slice(64 * 2);
        const chunks = parsedResult.match(/.{1,64}/g);
        if (!chunks)
            return { balances: [], error: 'No balances returned from RPC request' };
        const { default: tokenList } = (await Promise.resolve().then(() => __importStar(require(`./data/tokens/${_chain}.json`))));
        if (!tokenList)
            throw new Error(`No token list available for chain ${_chain}`);
        const balances = [];
        for (let i = 0; i < tokenAddresses.length; i++) {
            const token = tokenList[tokenAddresses[i].toLowerCase()];
            if (!token)
                continue;
            const { decimals, name, symbol } = token;
            const balance = parseInt(chunks[i], 16) / Math.pow(10, decimals);
            if (balance === 0)
                continue;
            balances.push({
                name,
                symbol,
                balance,
                address: tokenAddresses[i],
                decimals,
            });
        }
        return { balances, error: null };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : `${error}`;
        return { balances: [], error: errorMessage };
    }
}
exports.getTokensBalances = getTokensBalances;
function buildCallData({ method, address, tokens }) {
    const data = [
        method,
        '0'.repeat(64 - address.slice(2).length),
        address.slice(2),
        '0'.repeat(64 - 2),
        '40',
        '0'.repeat(64 - tokens.length.toString(16).length),
        tokens.length.toString(16),
        ...tokens.map(token => '0'.repeat(64 - token.slice(2).length) + token.slice(2)),
    ];
    return data.join('').toLowerCase();
}
