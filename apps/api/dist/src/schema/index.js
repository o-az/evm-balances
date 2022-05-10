"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceSchema = exports.specificBalancesSchema = exports.balancesSchema = void 0;
const mapper_1 = require("../chain/mapper");
const baseSchema = {
    params: {
        type: 'object',
        additionalProperties: false,
        errorMessage: 'Invalid params; expected { chain: "polygon-mainnet", address: "0x..." }',
        required: ['chain', 'address'],
        properties: {
            chain: {
                type: 'string',
                enum: mapper_1.POSSIBLE_CHAIN_NAMES,
            },
            address: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                error: { type: ['string', 'null'] },
                additonalProperties: false,
                balances: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            address: { type: 'string' },
                            balance: { type: 'integer' },
                            name: { type: 'string' },
                            symbol: { type: 'string' },
                            decimals: { type: 'integer' },
                        },
                    },
                },
            },
        },
        400: {
            type: 'object',
            properties: {
                error: { type: ['string', 'null'] },
                additonalProperties: false,
                balances: {
                    type: 'array',
                    items: { type: 'object' },
                },
            },
        },
    },
};
const balancesSchema = { ...baseSchema };
exports.balancesSchema = balancesSchema;
const specificBalancesSchema = {
    ...baseSchema,
    body: {
        type: 'array',
        items: { type: 'string' },
    },
};
exports.specificBalancesSchema = specificBalancesSchema;
const balanceSchema = {
    ...baseSchema,
    querystring: {
        type: 'object',
        additionalProperties: false,
        errorMessage: 'Invalid querystring; expected { token: "0x..." }',
        properties: {
            token: { type: 'string' },
        },
    },
};
exports.balanceSchema = balanceSchema;
