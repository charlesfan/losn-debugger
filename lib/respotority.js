const mssql = require('mssql');
const _ = require('lodash');

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

const Fulltable = function(db) {
	this.db = db;
	this.schema = Schema;
	this.cmd = '';
}

Fulltable.prototype.Select = function(params) {
	this.cmd = (params && Object.keys(params).length > 0) ?
    'select ' + paramsBinding(params) + 'from ' + table + ' ':
    'select * from Fulltable ';
	return this;
}

Fulltable.prototype.where = function(opts) {
	let self = this;
	if(Object.keys(opts).length > 0) {
		this.cmd += (this.cmd.indexOf('where') > 0) ? 
			'and ':
			'where ';

		let keys = _.keys(opts);

		keys.forEach(function(key, index) {
			if(Schema.hasOwnProperty(key)) {
				self.db.input(key, Schema[key], opts[key]);
				cmd += (i === keys.length - 1) ?
					key + ' = @' + key + ' ':
					key + ' = @' + key + ' and ';
			}
		});
	}
	return this;
}

Fulltable.prototype.range = function(key, range) {
	let self = this;
	if(Schema.hasOwnProperty(key) && range.length > 0) {
		self.cmd += (this.cmd.indexOf('where') > 0) ? 
			'and ':
			'where ';
		for(let i = 0; i < range.length; i++) {
			switch(i) {
				case 0:
					self.cmd += key + ' >= ' + '@start ';
					self.db.request.input('start', Schema[key], range[0]);
					break;
				case 1:
					self.cmd += key + ' < ' + '@end ';
					self.db.request.input('end', Schema[key], range[1]);
					break;
				default:
					break;
			}
			if(range[i+1]) {
				this.cmd += 'and '
			}
		}
	}
	return this;
}

Fulltable.prototype.order = function(key) {
	this.cmd += 'order by ' + key + ' DESC ';
	return this;
}

Fulltable.prototype.top = function(n) {
	this.cmd = this.cmd.slice(0, 7) + 'top ' +
  n + ' ' +
  this.cmd.slice(7) + ' ';
  return this;
}

Fulltable.prototype.offset = function(offset, next) {
	this.cmd += 'offset ' + offset + ' rows ';
	if(next) {
		this.cmd += 'fetch next ' + next + ' rows only ';
	}
	return this;
}

Fulltable.prototype.getSQL = function() {
	return this.cmd;
}

Fulltable.prototype.query = async function() {
	let result;
	console.log(this.cmd);
	try {
	await this.db.query(this.cmd).then(datas => {
		result = datas.recordset;
	});
	} catch(err) {
		console.log(err);
	}
	return result;
}
exports.Fulltable = Fulltable;
