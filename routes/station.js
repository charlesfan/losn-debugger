const express = require('express');
const util = require('util');
const router = express.Router();
const mssql = require('../lib/mssql');
const stationRespotority = require('../models/station');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/info/list', async (req, res) => {
	let db = new mssql.Server();
	let respotority = new stationRespotority(db);

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
module.exports = router;
