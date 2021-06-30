"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const ethers_1 = __importDefault(require("ethers"));
const getL1WsProvider = () => {
    const provider = ethers_1.default.getDefaultProvider(config_1.default.web3.localProvider);
    return provider;
};
exports.default = {
    getL1WsProvider,
};
