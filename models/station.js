const respotority = require('../lib/respotority');

module.exports = station = function(db) {
	this.respotority = new respotority.stationInfo(db);
	this.result = null;
}

station.prototype.list = async function(opts) {
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
