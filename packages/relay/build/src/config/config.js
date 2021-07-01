"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SERVER = {
    port: process.env.PORT || 8080,
};
const WEB3 = {
    bucketFactory: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    l1PolygonDeposit: "0x",
    l2PolygonDeposit: "0x",
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
