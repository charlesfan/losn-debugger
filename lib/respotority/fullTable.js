const mssql = require('mssql');
const sql = require('./sql');

const VARCHAR = mssql.VarChar;
const INT = mssql.Int;
const DATETIME = mssql.DateTime2;
const FLOAT = mssql.Float;
const Schema = {
  Station_GUID: VARCHAR,
  Checkin_time: DATETIME,
  Checkout_time: DATETIME,
  Interval_sec: FLOAT,
  RFID_ID: VARCHAR
}

module.exports = fullTable = function(db) {
  sql.call(this, db, 'Fulltable', Schema);
}

fullTable.prototype = Object.create(sql.prototype);
fullTable.prototype.constructor = fullTable;
