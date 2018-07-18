const respotority = require('../lib/respotority');

module.exports = device = function(db) {
	this.respotority = new respotority.deviceInfo(db);
	this.result = null;
}

device.prototype.getById = async function(id, ...opts) {
	let self = this;
	let params = {
		UUID: {
			value: id,
		}
	};
	let result;

	try {
		await self.respotority.Select(opts).where(params).query().then(datas => {
			result = datas;
		});
	} catch(e) {
		console.log('[model/device ERROR]: ');
		console.log(e);
	}
	return result;
}

device.prototype.list = async function(opts) {
	let self = this;
	let result;

	let _opts = await self.respotority.json2WhereObj(opts);

	try {
		await self.respotority.Select().where(_opts).query().then(r => {
			self.respotority.arrAssemble(r);
			result = r;
		});
		return result;
	} catch(err) {
		console.log("ERROR TYPE: " + err.code);
		let e = {};
		switch(err.code) {
			case 'ETIMEOUT':
				e.code = 504;
				e.message = 'Request timeout';
				break;
			case 'EREQUEST':
				e.code = 400;
				e.message = 'INPUT ERROR';
				break;
			default:
				e.code = 503;
				e.message = 'Service ERROR';
				break;
		}
		throw e;
	}
}

device.prototype.update = async function(opts, params) {
	let self = this;
	let result;

	self.respotority.assemble(params, true);

	try {
		await self.respotority.Update(params).where(opts).query(null, 'rowsAffected').then(r => {
			result = r;
		});
		return result;
	} catch(err) {
		console.log("ERROR TYPE: " + err.code);
		let e = {};
		switch(err.code) {
			case 'ETIMEOUT':
				e.code = 504;
				e.message = 'Request timeout';
				break;
			case 'EREQUEST':
				e.code = 400;
				e.message = 'INPUT ERROR';
				break;
			default:
				e.code = 503;
				e.message = 'Service ERROR';
				break;
		}
		throw e;
	}
}
