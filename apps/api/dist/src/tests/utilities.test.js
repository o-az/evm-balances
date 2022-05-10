"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const utilities_1 = require("../utilities");
const mapper_1 = require("../chain/mapper");
(0, vitest_1.expect)(() => {
    const text = 'polygon-mainnet';
    let result = false;
    for (const chain of mapper_1.POSSIBLE_CHAIN_NAMES) {
        if ((0, utilities_1.textContains)(text, chain)) {
            console.log(`${text} contains ${chain}`);
            result = true;
        }
    }
    return result;
}).toBeCloseTo;
