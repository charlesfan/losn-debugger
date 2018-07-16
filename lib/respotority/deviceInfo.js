const mssql = require('mssql');
const _ = require('lodash');
const sql = require('./sql');

const VARCHAR = mssql.VarChar;
const INT = mssql.Int;
const DATETIME = mssql.DateTime2;
const BigINT = mssql.BigInt;
const FLOAT = mssql.Float;
const Schema = {
  UUID: VARCHAR,
  Station_UUID: VARCHAR,
  IP_Address: VARCHAR,
 	FW_Version: VARCHAR,
	Rebooted: BigINT
}

const assembleMapping = {
	UUID: 'uuid',
	Station_UUID: 'stationUUID',
	IP_Address: 'ipAddress',
	FW_Version: 'fwVersion',
	Rebooted: 'rebooted'
}

module.exports = deviceInfo = function(db) {
  sql.call(this, db, 'Device_Info', Schema, assembleMapping);
}

deviceInfo.prototype = Object.create(sql.prototype);
deviceInfo.prototype.constructor = deviceInfo;

deviceInfo.prototype.assemble = function(raws, revert) {
	let keys = _.keys(raws);

	keys.forEach(function(key){
		let _key = (revert) ? 
			_.findKey(assembleMapping, _.partial(_.isEqual, key)) :
			assembleMapping[key];

		if(_key) {
			raws[_key] = raws[key];
			delete raws[key];
		}
	});
}

deviceInfo.prototype.arrAssemble = function(raws, revert) {
	let self = this;

	raws.forEach(function(raw) {
		self.assemble(raw, revert);
	});
}
