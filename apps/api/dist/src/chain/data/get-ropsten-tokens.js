"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const promises_1 = require("fs/promises");
const BASE_URL = "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://testnet.tokenlist.eth.link";
async function getTokens() {
    const response = await fetch(BASE_URL);
    try {
        const json = (await response.json());
        return json;
    }
    catch (error) {
        console.trace(error);
        throw new Error("Failed to fetch polygon tokens");
    }
}
function filterTokens(tokens) {
    const filteredTokens = {};
    tokens
        .filter(({ chainId }) => chainId === 42)
        .map(({ address, symbol, name, decimals }) => {
        filteredTokens[address] = { symbol, name, decimals };
    });
    return filteredTokens;
}
async function main() {
    const { tokens } = await getTokens();
    const filteredTokens = filterTokens(tokens);
    await (0, promises_1.writeFile)("./src/data/tokens/ropsten.json", JSON.stringify(filteredTokens, null, 2));
    const contracts = Object.keys(filteredTokens);
    await (0, promises_1.writeFile)("./src/data/tokens/ropsten-contracts.json", JSON.stringify(contracts, null, 2));
}
exports.main = main;
main().then((_) => console.log(JSON.stringify(_, null, 2)));
