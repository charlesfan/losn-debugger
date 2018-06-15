const express = require('express');
const util = require('util');
const router = express.Router();
const mssql = require('../lib/mssql');
const respotority = require('../lib/respotority');

router.get('/ota/ip', function(req, res) {
	let db = new mssql.Server();
	let deviceInfo = new respotority.deviceInfo(db);

	let params = {
		IP_Address: { type: 'notNull' },
		Station_UUID: { type: 'notNull' }
	}

	deviceInfo.Select(['IP_Address']).where(params).query().then( result => {
		let reData = '';

		result.forEach(function(value) {
			reData += value.IP_Address + '\n'
		});

		res.send(reData);
	});
});
module.exports = router;
