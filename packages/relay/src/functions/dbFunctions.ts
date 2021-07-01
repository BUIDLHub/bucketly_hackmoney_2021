import sqlite3 from 'sqlite3';
import config from '../config/config';

const initDatabase = () => {
  let db = new sqlite3.Database(config.db.dbname, err => {
    if (err)
      throw err
    console.log('Database started on ' + config.db.dbname)
  });

  db.run(`CREATE TABLE IF NOT EXISTS ${ config.db.bucketsTableName } (id INT PRIMARY KEY, token VARCHAR(10), expirationDate INT, totalAmount INT, triggerAmount INT)`, err => {
    if (err)
      throw err
    console.log(`Table ${ config.db.bucketsTableName } created`);
  });

  db.run(`CREATE TABLE IF NOT EXISTS ${ config.db.depositsTableName } (id INT PRIMARY KEY, bucketId INT, depositorAddress VARCHAR42, depositAmount INT)`, err => {
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

export default {
  initDatabase
}