const mssql = require('mssql');
const _ = require('lodash');
const sql = require('./sql');

const VARCHAR = mssql.VarChar;
const INT = mssql.Int;
const DATETIME = mssql.DateTime2;
const FLOAT = mssql.Float;
const Schema = {
	Station_UUID: VARCHAR,
	Station_GUID: VARCHAR,
	Checkin_time: DATETIME,
	Checkout_time: DATETIME,
	Interval_sec: FLOAT,
	RFID_ID: VARCHAR
}

const assembleMapping = {
	Station_UUID: 'stationUUID',
	Station_GUID: 'deviceUUID',
	Checkin_time: 'checkinTime',
	Checkout_time: 'checkoutTime',
	Interval_sec: 'intervalSec',
	RFID_ID: 'RFID'
}

module.exports = fullTable = function(db) {
  sql.call(this, db, 'Fulltable', Schema);
}

fullTable.prototype = Object.create(sql.prototype);
fullTable.prototype.constructor = fullTable;

fullTable.prototype.assemble = function(raws) {
	let keys = _.keys(raws);

	keys.forEach(function(key){
		if(assembleMapping.hasOwnProperty(key)) {
			raws[assembleMapping[key]] = raws[key];
			delete raws[key];
		}
	});
}

fullTable.prototype.arrAssemble = function(raws) {
	let self = this;

	raws.forEach(function(raw) {
		self.assemble(raw);
	});
}
