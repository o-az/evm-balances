"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = exports.chainIds = void 0;
const testnetChainIds = {
    ropsten: 3,
    rinkeby: 4,
    'bsc-testnet': 97,
    'avalance-testnet': 43113,
    'polygon-testnet': 80001,
};
const mainnetChainIds = {
    bsc: 56,
    ethereum: 1,
    fantom: 250,
    avalanche: 43114,
    optimism: 10,
    arbitrum: 42161,
    polygon: 137,
};
exports.chainIds = {
    ...mainnetChainIds,
    ...testnetChainIds,
};
exports.chains = Object.keys(exports.chainIds);
