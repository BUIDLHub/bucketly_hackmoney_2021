import sqlite3 from 'sqlite3';
import config from '../config/config';

const initDatabase = () => {
  let db = new sqlite3.Database(config.db.dbname, err => {
    if (err)
      throw err
    console.log('Database started on ' + config.db.dbname)
  });

  db.run(`CREATE TABLE IF NOT EXISTS ${ config.db.bucketsTableName } (id INT PRIMARY KEY, tokenAddress VARCHAR(42), bucketID INT, expirationDate INT, totalAmount INT, triggerAmount INT)`, err => {
    if (err)
      throw err
    console.log(`Table ${ config.db.bucketsTableName } created`);
  });

  db.run(`CREATE TABLE IF NOT EXISTS ${ config.db.depositsTableName } (id INT PRIMARY KEY, tokenAddress VARCHAR(42), bucketId INT, depositorAddress VARCHAR(42), depositAmount INT)`, err => {
    if (err)
      throw err
    console.log(`Table ${ config.db.depositsTableName } created`);
  });

  db.close(err => {
    if (err)
      throw err
    console.log('Database closed')
  });
}

const insertNewBucket = (tokenAddress: string, bucketId: number, expirationDate: number, triggerAmount: number) => {
  let db = new sqlite3.Database(config.db.dbname, err => {
    if (err)
      throw err
    console.log('Database started on ' + config.db.dbname)
  });
  db.run(`INSERT INTO ${ config.db.bucketsTableName } (tokenAddress, bucketId, expirationDate, totalAmount, triggerAmount) VALUES (${ tokenAddress }, ${ bucketId }, ${ expirationDate }, 0, ${ triggerAmount }) `, err => {
    if (err)
      throw err
    console.log('New bucket inserted into ' + config.db.bucketsTableName)
  })
}

// "Deposit", (tokenAddress: string, bucketId: number, amount: number, depositor: string)
const insertNewDeposit = (tokenAddress: string, bucketId: number, amount: number, depositor: string) => {
  let db = new sqlite3.Database(config.db.dbname, err => {
    if (err)
      throw err
    console.log('Database started on ' + config.db.dbname)
  });
  db.run(`INSERT INTO ${ config.db.depositsTableName } (tokenAddress, bucketId, amount, depositor) VALUES (${ tokenAddress }, ${ bucketId }, ${ amount }, ${ depositor }) `, err => {
    if (err)
      throw err
    console.log('New bucket inserted into ' + config.db.depositsTableName)
  })

}

const seeDb = () => {
  let db = new sqlite3.Database(config.db.dbname, err => {
    if (err)
      throw err
    console.log('Database started on ' + config.db.dbname)
  });
  // Line to populate the table for tests
  // db.run(`INSERT INTO ${ config.db.bucketsTableName } (id, token, expirationDate, totalAmount, triggerAmount) VALUES (1, 'DAI', 1625243279, 0, 10000) `)

  db.get(`SELECT * FROM ${ config.db.bucketsTableName }`, (err, data) => {
    if (err)
      throw err
    console.log(data)
  })
}

export default {
  initDatabase,
  insertNewBucket,
  insertNewDeposit,
  seeDb
}