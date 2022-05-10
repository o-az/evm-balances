"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const promises_1 = require("fs/promises");
const BASE_URL = 'https://tokenmapper.api.matic.today/api/v1/mapping';
async function getTokens({ limit, offset } = {
    limit: 200,
    offset: 0,
}) {
    const queryParams = new URLSearchParams({
        map_type: '["POS"]',
        chain_id: '137',
        limit: String(limit),
        offset: String(offset),
    });
    const response = await fetch(`${BASE_URL}?${queryParams}`);
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
    const polygon = {};
    const ethereum = {};
    tokens
        .filter(({ deleted }) => !deleted)
        .map(({ root_token, child_token, symbol, name, decimals }) => {
        polygon[root_token] = { symbol, name, decimals };
        ethereum[child_token] = { symbol, name, decimals };
    });
    return [polygon, ethereum];
}
async function main() {
    const response = await getTokens({ limit: 200, offset: 0 });
    const { mapping, has_next_page } = response.data;
    const [polygon, ethereum] = filterTokens(mapping);
    let [polygonTokens, ethereumTokens] = [polygon, ethereum];
    let hasNextPage = has_next_page && Boolean(mapping.length);
    let nextOffset = 200;
    while (hasNextPage) {
        const nextResponse = await getTokens({ offset: nextOffset, limit: 200 });
        const { mapping, has_next_page } = nextResponse.data;
        const [polygon, ethereum] = filterTokens(mapping);
        polygonTokens = { ...polygonTokens, ...polygon };
        ethereumTokens = { ...ethereumTokens, ...ethereum };
        hasNextPage = has_next_page && Boolean(mapping.length);
        nextOffset += 200;
    }
    await (0, promises_1.writeFile)('./src/data/tokens/ethereum.json', JSON.stringify(ethereumTokens));
    await (0, promises_1.writeFile)('./src/data/tokens/polygon.json', JSON.stringify(polygonTokens));
    const polygonContracts = Object.keys(polygonTokens);
    await (0, promises_1.writeFile)('./src/data/tokens/polygon-contracts.json', JSON.stringify(polygonContracts));
    const ethereumContracts = Object.keys(ethereumTokens);
    await (0, promises_1.writeFile)('./src/data/tokens/ethereum-contracts.json', JSON.stringify(ethereumContracts));
}
exports.main = main;
;
(async () => main())();
