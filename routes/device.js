const express = require('express');
const util = require('util');
const router = express.Router();
const mssql = require('../lib/mssql');
const deviceRespotority = require('../models/device');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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

router.put('/info/:id', jsonParser, async (req, res) => {
	let stationId = req.params.id;
	let db = new mssql.Server();
	let respotority = new deviceRespotority(db);
	let deviceInfo;

	try {
		await respotority.getById(req.body.uuid).then(result => {
			deviceInfo = result;
		});
	} catch(err) {
		console.log(err);
		res.status(500);
		res.send(err);
	}

	if(deviceInfo.length > 0) {
		let params = {UUID: req.body.uuid};
		let opts = {Station_UUID: stationId};

		try {
			await respotority.update(opts, params).then(result => {
				console.log(result);
				res.send(result);
			});
		} catch(err) {
			console.log(err);
			res.status(500);
			res.send(err);
		}
	}
});
module.exports = router;
