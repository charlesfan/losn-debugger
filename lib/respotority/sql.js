const _ = require('lodash');

module.exports = sql =  function(db, table, schema) {
	this.db = db;
	this.table = table;
	this.schema = schema;
	this.cmd = '';
}

//Private
sql.prototype._whereCmd = function(opts, key, index, tag) {
	let self = this;

	if(Array.isArray(opts[key])) {
		opts[key].forEach(function(v, i) {
			let _tag = 'where' + tag + i;
			self.db.request.input(_tag, self.schema[key], v.value);

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
	self.db.request.input(_tag, self.schema[key], opts[key].value);

	switch(opts[key].type) {
		case 'downner':
			self.cmd += key + ' <= @' + _tag + ' ';
			break;
		case 'upper':
			self.cmd += key + ' > @' + _tag + ' ';
			break;
		case 'in': //value must be array
			self.cmd += key + ' in ('
			opts[key].value.forEach(function(value, j) {
				let iName = 'in'+ _tag + j;
				self.db.request.input(iName, self.schema[key], value);
				self.cmd += '@' + iName;
				if(j < opts[key].value.length-1) {
					self.cmd += ', '
				}
			});
			self.cmd += ') ';
			break;
		default:
			self.cmd += key + ' = @' + _tag + ' ';
			break;
	}
}

sql.prototype._setCmd = function(key, value, index, tag) {
	let self = this;
	let _tag = 'set' + tag + index;

	self.db.request.input(_tag, self.schema[key], value);
	self.cmd += key + ' = @' + _tag;
}

//Public
sql.prototype.Select = function(params) {
	this.cmd = (params && Object.keys(params).length > 0) ?
    'select ' + paramsBinding(params) + 'from ' + this.table + ' ':
    'select * from ' + this.table + ' ';
	return this;
}

sql.prototype.Update = function(params) {
	let self = this;
	self.cmd = 'update ' + self.table + ' set '
	let keys = _.keys(params);

	keys.forEach(function(key, i) {
		let tag = 0;
		self._setCmd(key, params[key], i, tag);
		self.cmd += (keys[i+1]) ? ', ' : ' ';
		tag++;
	});
	return self;
}

sql.prototype.where = function(opts) {
	let self = this;
	let tag = 0;

	if(Object.keys(opts).length > 0) {
		this.cmd += (this.cmd.indexOf('where') > 0) ? 
			'and ':
			'where ';

		let keys = _.keys(opts);

		keys.forEach(function(key, index) {
			if(!self.schema.hasOwnProperty(key)) {
				return console.log(key + ': ' + 
						self.table + 
						' has no this column.');
			}
			self._whereCmd(opts, key, index, tag);
			if(index < keys.length - 1) {
				self.cmd += 'and ';
				tag++;
			}
		});
	}
	return this;
}

sql.prototype.order = function(key, desc) {
	this.cmd += (desc && typeof(desc) === 'boolean') 
		? 'order by ' + key + ' DESC '
		: 'order by ' + key + ' ';
	return this;
}

sql.prototype.top = function(n) {
	this.cmd = this.cmd.slice(0, 7) + 'top ' +
  n + ' ' +
  this.cmd.slice(7) + ' ';
  return this;
}

sql.prototype.offset = function(offset, next) {
	this.cmd += 'offset ' + offset + ' rows ';
	if(next) {
		this.cmd += 'fetch next ' + next + ' rows only ';
	}
	return this;
}

sql.prototype.getSQL = function() {
	return this.cmd;
}

sql.prototype.query = async function(sql) {
	let result;
	let _sql = (sql) ? sql : this.cmd;

	console.log(_sql);
	try {
	await this.db.query(_sql).then(datas => {
		result = datas.recordset;
	});
	} catch(err) {
		console.log(err);
	}
	return result;
}

function paramsBinding(params) {
	let re = '';
	if(Array.isArray(params)) {
		for (let i = 0; i < params.length; i++) {
			re += (i === params.length - 1) ?
				params[i] + ' ':
				params[i] + ', ';
		}
	}
	return re;
}
