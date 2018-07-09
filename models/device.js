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
			result = datas
		});
	} catch(e) {
		console.log(e);
	}
	return result;
}

device.prototype.update = async function(opts, params) {
	let self = this;
	let result;

	self.respotority.assemble(params, true);

	try {
		await self.respotority.Update(params).where(opts).query(null, 'rowsAffected').then(r => {
			result = r;
		});
	} catch(e) {
		console.log(e);
	}
	return result;
}
