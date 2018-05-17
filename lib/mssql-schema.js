const mssql = require('mssql');
const VARCHAR = mssql.VarChar;
const INT = mssql.Int;
const DATETIME = mssql.DateTime2;
const FLOAT = mssql.Float;

exports.OneDayEfficiency = {
	Station_GUID: VARCHAR,
	Station_Name: VARCHAR,
	Efficiency_Up: INT,
	Efficiency_Middle: INT,
	Efficiency_Down: INT,
	UpdateTime: DATETIME
}

exports.FullTable = {
	Station_GUID: VARCHAR,
	Checkin_time: DATETIME,
	Checkout_time: DATETIME,
	Interval_sec: FLOAT,
	RFID_ID: VARCHAR
}
