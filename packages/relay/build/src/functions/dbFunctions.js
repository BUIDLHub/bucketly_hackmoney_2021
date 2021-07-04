"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const config_1 = __importDefault(require("../config/config"));
const initDatabase = () => {
    let db = new sqlite3_1.default.Database(config_1.default.db.dbname, err => {
        if (err)
            throw err;
        console.log('Database started on ' + config_1.default.db.dbname);
    });
    db.run(`CREATE TABLE IF NOT EXISTS ${config_1.default.db.bucketsTableName} (id INT PRIMARY KEY, tokenAddress VARCHAR(42), bucketID INT, expirationDate INT, totalAmount INT, triggerAmount INT)`, err => {
        if (err)
            throw err;
        console.log(`Table ${config_1.default.db.bucketsTableName} created`);
    });
    db.run(`CREATE TABLE IF NOT EXISTS ${config_1.default.db.depositsTableName} (id INT PRIMARY KEY, tokenAddress VARCHAR(42), bucketId INT, depositorAddress VARCHAR(42), depositAmount INT)`, err => {
        if (err)
            throw err;
        console.log(`Table ${config_1.default.db.depositsTableName} created`);
    });
    db.close(err => {
        if (err)
            throw err;
        console.log('Database closed');
    });
};
const insertNewBucket = (tokenAddress, bucketId, expirationDate, triggerAmount) => {
    let db = new sqlite3_1.default.Database(config_1.default.db.dbname, err => {
        if (err)
            throw err;
        console.log('Database started on ' + config_1.default.db.dbname);
    });
    db.run(`INSERT INTO ${config_1.default.db.bucketsTableName} (tokenAddress, bucketId, expirationDate, totalAmount, triggerAmount) VALUES (${tokenAddress}, ${bucketId}, ${expirationDate}, 0, ${triggerAmount}) `, err => {
        if (err)
            throw err;
        console.log('New bucket inserted into ' + config_1.default.db.bucketsTableName);
    });
};
// "Deposit", (tokenAddress: string, bucketId: number, amount: number, depositor: string)
const insertNewDeposit = (tokenAddress, bucketId, amount, depositor) => {
    let db = new sqlite3_1.default.Database(config_1.default.db.dbname, err => {
        if (err)
            throw err;
        console.log('Database started on ' + config_1.default.db.dbname);
    });
    db.run(`INSERT INTO ${config_1.default.db.depositsTableName} (tokenAddress, bucketId, amount, depositor) VALUES (${tokenAddress}, ${bucketId}, ${amount}, ${depositor}) `, err => {
        if (err)
            throw err;
        console.log('New bucket inserted into ' + config_1.default.db.depositsTableName);
    });
};
const seeDb = () => {
    let db = new sqlite3_1.default.Database(config_1.default.db.dbname, err => {
        if (err)
            throw err;
        console.log('Database started on ' + config_1.default.db.dbname);
    });
    // Line to populate the table for tests
    // db.run(`INSERT INTO ${ config.db.bucketsTableName } (id, token, expirationDate, totalAmount, triggerAmount) VALUES (1, 'DAI', 1625243279, 0, 10000) `)
    db.get(`SELECT * FROM ${config_1.default.db.bucketsTableName}`, (err, data) => {
        if (err)
            throw err;
        console.log(data);
    });
};
exports.default = {
    initDatabase,
    insertNewBucket,
    insertNewDeposit,
    seeDb
};
