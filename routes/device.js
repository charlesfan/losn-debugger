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

router.post('/', jsonParser, async (req, res) => {
	let db = new mssql.Server();
	let respotority = new deviceRespotority(db);

	try {
		await respotority.add(req.body).then(result => {
			res.send(result);
		});
	} catch(err) {
		console.log(err);
		res.status(err.code);
		res.send(err);
	}
});

router.delete('/', async (req, res) => {
	let db = new mssql.Server();
	let respotority = new deviceRespotority(db);

	if(Object.keys(req.query).length <= 0) {
		res.status(400);
		return res.send({
			code: 400,
			message: 'Null input'
		});
	}

	try {
		await respotority.remove(req.query).then(result => {
			res.send(result);
		});
	} catch(err) {
		console.log(err);
		res.status(err.code);
		res.send(err);
	}
});

router.get('/info/list', async (req, res) => {
	let db = new mssql.Server();
	let respotority = new deviceRespotority(db);

	try {
		await respotority.list(req.query).then(result => {
			res.send(result);
		});
	} catch(err) {
		console.log(err);
		res.status(err.code);
		res.send(err);
	}
});

router.put('/info/:id', jsonParser, async (req, res) => {
	let stationId = req.params.id;
	let db = new mssql.Server();
	let respotority = new deviceRespotority(db);

	let opts = {
		UUID: {
			value: req.params.id
		}
	}

	try {
		await respotority.update(opts, req.body).then(result => {
			res.send(result);
		});
	} catch(err) {
		res.status(err.code);
		res.send(err);
	}
});
module.exports = router;
