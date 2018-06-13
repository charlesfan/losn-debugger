const mssql = require('mssql');
const sql = require('./sql');

const VARCHAR = mssql.VarChar;
const INT = mssql.Int;
const DATETIME = mssql.DateTime2;
const FLOAT = mssql.Float;
const Schema = {
  UUID: VARCHAR,
  Checkin_time: DATETIME,
  Line_Name: DATETIME
}

module.exports = lineInfo = function(db) {
  sql.call(this, db, 'Line_Info', Schema);
}

lineInfo.prototype = Object.create(sql.prototype);
lineInfo.prototype.constructor = lineInfo;
