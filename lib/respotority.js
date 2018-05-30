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

//Private
Fulltable.prototype._whereCmd = function(opts, key, index, tag) {
	let self = this;

	if(Array.isArray(opts[key])) {
		opts[key].forEach(function(v, i) {
			let _tag = 'where' + tag + i;
			self.db.request.input(_tag, Schema[key], v.value);

			switch(v.type) {
				case 'downner':
					self.cmd += key + ' <= @' + _tag + ' ';
					break;
				case 'upper':
					self.cmd += key + ' > @' + _tag + ' ';
					break;
				default:
					self.cmd += key + ' = @' + _tag + ' ';
					break;
			}
			if(i < opts[key].length-1) {
				self.cmd += 'and '
			}
		});
		return;
	}

	let _tag = 'where' + tag + index;
	self.db.request.input(_tag, Schema[key], opts[key].value);

	switch(opts[key].type) {
		case 'downner':
			self.cmd += key + ' <= @' + _tag + ' ';
			break;
		case 'upper':
			self.cmd += key + ' > @' + _tag + ' ';
			break;
		default:
			self.cmd += key + ' = @' + _tag + ' ';
			break;
	}
}

//Public
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
			if(!Schema.hasOwnProperty(key)) {
				return console.log(key + ': Fulltable has no this column.');
			}
			let tag = 0;
			self._whereCmd(opts, key, index, tag);
			if(index < keys.length - 1) {
				self.cmd += 'and ';
				tag++;
			}
		});
	}
	return this;
}

Fulltable.prototype.order = function(key, desc) {
	this.cmd += (desc && typeof(desc) === 'boolean') 
		? 'order by ' + key + ' DESC '
		: 'order by ' + key + ' ';
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
