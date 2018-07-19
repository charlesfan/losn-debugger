const mssql = require('mssql');
const _ = require('lodash');
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

const assembleMapping = {
	UUID: 'uuid',
	Line_UUID: 'lineUUID',
	Position: 'position',
	Station_Name: 'stationName',
	Working: 'working',
	Avage_Value: 'avageValue',
	Avage_Update_Time: 'avageUpdateTime'
}

module.exports = stationInfo = function(db) {
  sql.call(this, db, 'Station_Info', Schema, assembleMapping);
}

stationInfo.prototype = Object.create(sql.prototype);
stationInfo.prototype.constructor = stationInfo;

stationInfo.prototype.assemble = function(raws) {
	let keys = _.keys(raws);

	keys.forEach(function(key) {
		if(assembleMapping.hasOwnProperty(key)) {
			raws[assembleMapping[key]] = raws[key];
			delete raws[key];
		}
	});
}

stationInfo.prototype.arrAssemble = function(raws) {
	let self = this;

	raws.forEach(function(raw) {
		self.assemble(raw);
	});
}
