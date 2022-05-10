"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETHEREUM = exports.ETHEREUM_CONTRACTS = exports.POLYGON = exports.POLYGON_CONTRACTS = exports.ROPSTEN = exports.ROPSTEN_CONTRACTS = void 0;
const ropsten_contracts_json_1 = __importDefault(require("./tokens/ropsten-contracts.json"));
exports.ROPSTEN_CONTRACTS = ropsten_contracts_json_1.default;
const ropsten_json_1 = __importDefault(require("./tokens/ropsten.json"));
exports.ROPSTEN = ropsten_json_1.default;
const polygon_contracts_json_1 = __importDefault(require("./tokens/polygon-contracts.json"));
exports.POLYGON_CONTRACTS = polygon_contracts_json_1.default;
const polygon_json_1 = __importDefault(require("./tokens/polygon.json"));
exports.POLYGON = polygon_json_1.default;
const ethereum_contracts_json_1 = __importDefault(require("./tokens/ethereum-contracts.json"));
exports.ETHEREUM_CONTRACTS = ethereum_contracts_json_1.default;
const ethereum_json_1 = __importDefault(require("./tokens/ethereum.json"));
exports.ETHEREUM = ethereum_json_1.default;
