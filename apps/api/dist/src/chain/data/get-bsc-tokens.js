"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const urls = [
    'https://tokens.pancakeswap.finance/pancakeswap-top-100.json',
    'https://tokens.pancakeswap.finance/pancakeswap-extended.json',
];
async function getTokens({ extended = false }) {
    const response = await fetch(urls[extended ? 1 : 0]);
    try {
        const json = (await response.json());
        return json;
    }
    catch (error) {
        console.trace(error);
        throw new Error('Failed to fetch polygon tokens');
    }
}
function filterTokens(tokens) {
    const bsc = {};
    tokens.map(({ name, address, symbol, decimals }) => {
        bsc[address.toLowerCase()] = { symbol, name, decimals };
    });
    return bsc;
}
async function main() {
    const { tokens } = await getTokens({ extended: true });
    const filteredTokens = filterTokens(tokens);
    await (0, promises_1.writeFile)(__dirname + '/tokens/bsc.json', JSON.stringify(filteredTokens));
    const contracts = Object.keys(filteredTokens);
    await (0, promises_1.writeFile)(__dirname + '/tokens/bsc-contracts.json', JSON.stringify(contracts));
}
;
(async () => main())();
