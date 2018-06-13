const mssql = require('mssql');
const sql = require('./sql');

const VARCHAR = mssql.VarChar;
const INT = mssql.Int;
const DATETIME = mssql.DateTime2;
const FLOAT = mssql.Float;
const Schema = {
  UUID: VARCHAR,
  Line_UUID: VARCHAR,
	Position: INT,
  Station_Name: VARCHAR,
	Working: INT,
	Avage_Value: FLOAT,
	Avage_Update_Time: DATETIME
}

module.exports = stationInfo = function(db) {
  sql.call(this, db, 'Station_Info', Schema);
}

stationInfo.prototype = Object.create(sql.prototype);
stationInfo.prototype.constructor = stationInfo;
