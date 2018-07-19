const mssql = require('mssql');
const _ = require('lodash');
const sql = require('./sql');

const VARCHAR = mssql.VarChar;
const INT = mssql.Int;
const DATETIME = mssql.DateTime2;
const FLOAT = mssql.Float;
const Schema = {
  UUID: VARCHAR,
  Line_Name: VARCHAR,
	SCT: INT,
	Headcount: INT
}

const assembleMapping = {
	UUID: 'uuid',
	Line_Name: 'lineName',
	SCT: 'sct',
	Headcount: 'headcount'
}

module.exports = lineInfo = function(db) {
  sql.call(this, db, 'Line_Info', Schema, assembleMapping);
}

lineInfo.prototype = Object.create(sql.prototype);
lineInfo.prototype.constructor = lineInfo;

lineInfo.prototype.assemble = function(raws, revert) {
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

lineInfo.prototype.arrAssemble = function(raws, revert) {
	let self = this;

	raws.forEach(function(raw) {
		self.assemble(raw, revert);
	});
}
