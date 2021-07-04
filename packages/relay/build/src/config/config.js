"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SERVER = {
    port: process.env.PORT || 8080,
};
const WEB3 = {
    bucketFactory: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    bucketL1: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    bucketL2: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    testERC20L1: "0x3f152B63Ec5CA5831061B2DccFb29a874C317502",
    testERC20L2: "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e",
    RootERC20Contract: "0xeE11713Fe713b2BfF2942452517483654078154D",
    DepositManager: "0x7850ec290A2e2F40B82Ed962eaf30591bb5f5C96",
    ChildChainContract: "0x1EDd419627Ef40736ec4f8ceffdE671a30803c5e",
    l1HttpProvider: "https://goerli-light.eth.linkpool.io",
    l1WsProvider: "wss://goerli-light.eth.linkpool.io/ws",
    l2HttpProvider: "https://matic-mumbai.chainstacklabs.com",
    l2WsProvider: "wss://ws-matic-mumbai.chainstacklabs.com",
    localProvider: "http://127.0.0.1:8545/"
};
const DB = {
    dbname: "bucketlyMainDB",
    bucketsTableName: "bucketsTable",
    depositsTableName: "depositsTable"
};
const config = {
    server: SERVER,
    web3: WEB3,
    db: DB
};
exports.default = config;
