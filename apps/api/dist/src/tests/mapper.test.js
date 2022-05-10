"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const mapper_1 = require("../chain/mapper");
const POSSIBLE_CHAIN_AND_ITS_MATCH = [];
(0, vitest_1.beforeAll)(() => {
    mapper_1.POSSIBLE_CHAIN_NAMES.forEach(chain => {
        const mappedChain = (0, mapper_1.mapChain)(chain);
        POSSIBLE_CHAIN_AND_ITS_MATCH.push({ mappedChain, possibleName: chain });
    });
});
(0, vitest_1.describe)('mapChain', () => {
    POSSIBLE_CHAIN_AND_ITS_MATCH.forEach(({ mappedChain, possibleName }) => {
        (0, vitest_1.it)(`should map ${possibleName} to ${mappedChain}`, () => {
            (0, vitest_1.expect)(mappedChain).toBe(possibleName);
        });
    });
});
(0, vitest_1.test)('mainnet to map to ethereum', () => {
    (0, vitest_1.expect)((0, mapper_1.mapChain)('mainnet')).toBe('ethereum');
});
(0, vitest_1.test)('cosmos to throw an error', () => {
    (0, vitest_1.expect)(() => {
        (0, mapper_1.mapChain)('cosmos');
    }).toThrowError(/Unknown chain/);
});
