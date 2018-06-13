const mssql = require('mssql');
const sql = require('./sql');

const VARCHAR = mssql.VarChar;
const INT = mssql.Int;
const DATETIME = mssql.DateTime2;
const FLOAT = mssql.Float;
const Schema = {
  UUID: VARCHAR,
  Station_UUID: VARCHAR,
  IP_Address: VARCHAR,
 	FW_Version: VARCHAR,
}

module.exports = deviceInfo = function(db) {
  sql.call(this, db, 'Device_Info', Schema);
}

deviceInfo.prototype = Object.create(sql.prototype);
deviceInfo.prototype.constructor = deviceInfo;
