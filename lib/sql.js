const _ = require('lodash');

const Select = function(table, params) {
	this.cmd = (params && Object.keys(params).length > 0) ? 
		'select ' + paramsBinding(params) + 'from ' + table + ' ':
		'select * from ' + table + ' ';
}

Select.prototype.where = function(opts) {
	let self = this;
	this.cmd += 'where ';

	let keys = _.keys(opts);

	for(let i = 0; i < keys.length; i++) {
		this.cmd += (i === keys.length - 1) ?
			keys[i] + ' = ' + opts[keys[i]] + ' ': 
			keys[i] + ' = ' + opts[keys[i]] + ', ';
	}
	return this;
}

Select.prototype.order = function(opts) {
	this.cmd += 'order by ' + key + ' ';
	return this;
}

Select.prototype.top = function(n) {
	this.cmd = this.cmd.slice(0, 7) + 'top ' + 
	n + ' ' + 
	this.cmd.slice(7) + ' ';
	return this;
}

Select.prototype.desc = function() {
	this.cmd += 'DESC';
	return this;
}

Select.prototype.getSQL = function() {
	return this.cmd;
}

Select.prototype.run =  async function(db) {
	let result
	await db.query(this.cmd).then(datas => {
		result = datas.recordset;
	});
	return result;
}
exports.Select = Select;

function paramsBinding(params) {
	let re = '';
	if(Array.isArray(params)) {
		for (let i = 0; i < params.length; i++) {
			re += (i === params.length - 1) ? 
				params[i] + ' ': 
				params[i] + ', ';
		}
	}
	return re
}
