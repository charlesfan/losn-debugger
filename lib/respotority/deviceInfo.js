const mssql = require('mssql');
const _ = require('lodash');
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

const assembleMapping = {
	UUID: 'uuid',
	Station_UUID: 'stationUUID',
	IP_Address: 'ipAddress',
	FW_Version: 'fwVersion'
}

module.exports = deviceInfo = function(db) {
  sql.call(this, db, 'Device_Info', Schema);
}

deviceInfo.prototype = Object.create(sql.prototype);
deviceInfo.prototype.constructor = deviceInfo;

deviceInfo.prototype.assemble = function(raws) {
	let keys = _.keys(raws);

	keys.forEach(function(key){
		if(assembleMapping.hasOwnProperty(key)) {
			raws[assembleMapping[key]] = raws[key];
			delete raws[key];
		}
	});
}

deviceInfo.prototype.arrAssemble = function(raws) {
	let self = this;

	raws.forEach(function(raw) {
		self.assemble(raw);
	});
}
