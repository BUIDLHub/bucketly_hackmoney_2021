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
exports.default = {
    initDatabase
};
