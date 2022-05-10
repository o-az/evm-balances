"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const balance_1 = require("../chain/balance");
const data_1 = require("../chain/data");
const TEST_ADDRESSES = [
    '0x52a258ed593c793251a89bfd36cae158ee9fc4f8',
    '0x0d0707963952f2fba59dd06f2b425ace40b492fe',
    '0x26d961f3a1dfd529f87c2925b8f23e3bddeb8583',
    '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
];
(0, vitest_1.test)(`getTokensBalances({...})`, async () => {
    vitest_1.expect.assertions(2);
    const { error, balances } = await (0, balance_1.getTokensBalances)({
        address: TEST_ADDRESSES[TEST_ADDRESSES.length - 1],
        tokens: data_1.POLYGON_CONTRACTS,
        chain: 'polygon-mainnet',
    });
    (0, vitest_1.expect)(balances).toMatchObject([]);
    (0, vitest_1.expect)(error).toContain('Invalid address');
});
TEST_ADDRESSES.forEach(async (address, index) => {
    vitest_1.expect.assertions(1);
    (0, vitest_1.test)(`getTokensBalances({...})`, async () => {
        const response = await (0, balance_1.getTokensBalances)({
            address,
            tokens: data_1.POLYGON_CONTRACTS,
            chain: 'polygon-mainnet',
        });
        (0, vitest_1.expect)(response).not.toBeNull();
    });
});
(0, vitest_1.test)('should return balances', async () => {
    vitest_1.expect.assertions(1);
    const { balances, error } = await (0, balance_1.getTokensBalances)({
        address: TEST_ADDRESSES[0],
        tokens: data_1.POLYGON_CONTRACTS,
        chain: 'polygon-testnet',
    });
    (0, vitest_1.expect)(error).toBeNull();
});
(0, vitest_1.test)('getTokensBalances', async () => {
    vitest_1.expect.assertions(2);
    const { balances, error } = await (0, balance_1.getTokensBalances)({
        address: TEST_ADDRESSES[0],
        tokens: data_1.POLYGON_CONTRACTS,
        chain: 'polygon',
    });
    (0, vitest_1.expect)(balances).not.toBeNull();
    (0, vitest_1.expect)(error).toBeNull();
});
