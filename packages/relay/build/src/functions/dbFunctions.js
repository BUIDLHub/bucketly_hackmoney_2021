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
    db.run(`CREATE TABLE IF NOT EXISTS ${config_1.default.db.bucketsTableName} (id INT PRIMARY KEY, token VARCHAR(10), expirationDate INT, totalAmount INT, triggerAmount INT)`, err => {
        if (err)
            throw err;
        console.log(`Table ${config_1.default.db.bucketsTableName} created`);
    });
    db.run(`CREATE TABLE IF NOT EXISTS ${config_1.default.db.depositsTableName} (id INT PRIMARY KEY, bucketId INT, depositorAddress VARCHAR42, depositAmount INT)`, err => {
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
const insertNewBucket = (id, token, expirationDate, totalAmount, triggerAmount) => {
    let db = new sqlite3_1.default.Database(config_1.default.db.dbname, err => {
        if (err)
            throw err;
        console.log('Database started on ' + config_1.default.db.dbname);
    });
    db.run(`INSERT INTO ${config_1.default.db.bucketsTableName} (id, token, expirationDate, totalAmount, triggerAmount) VALUES (1, 'DAI', 1625243279, 0, 10000) `, err => {
        if (err)
            throw err;
        console.log('New bucket inserted into ' + config_1.default.db.bucketsTableName);
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
    seeDb
};
