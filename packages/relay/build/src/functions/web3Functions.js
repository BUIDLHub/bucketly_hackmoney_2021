"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const ethers_1 = require("ethers");
let provider = undefined;
const getL1Provider = () => {
    if (provider) {
        return provider; //cached
    }
    provider = new ethers_1.ethers.providers.JsonRpcProvider(config_1.default.web3.l1HttpProvider);
    return provider;
};
exports.default = {
    getL1Provider,
};
