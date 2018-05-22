const express = require('express');
const moment = require('moment-timezone');
const router = express.Router();
const mssql = require('../lib/mssql');
const schema = require('../lib/mssql-schema');
//const sql = require('../lib/sql');
const respotority = require('../lib/respotority');
/*
router.get('/', function(req, res) {
	res.send('Herer is Debugger!!!!');
});
*/

router.get('/dev/firmware', function(req, res) {
	let db = new mssql.Server();
	let fulltable = new respotority.Fulltable(db);
	let params = {
		Station_GUID: {
			value: ['LOSN-607990', 'LOSN-607B21', 'LOSN-60895E'],
		}
	};
	var fetch = 0;
	var max = 10;
	if(req.query.start) {
		let time = moment.tz(parseInt(req.query.start, 10), "Asia/Taipei").format();
		params.Checkin_time = {
			value: time,
			type: 'upper'
		}
	}
	if(req.query.end) {
		console.log(moment.tz(parseInt(req.query.end, 10), "Asia/Taipei").format());
		let time = moment.tz(parseInt(req.query.end, 10), "Asia/Taipei").format();
		params.Checkin_time = {
			value: time,
			type: 'downner'
		}
	}
	if(req.query.page) {
		fetch = req.query.page;
	}
	if(req.query.max) {
		max = req.query.max;
	}
	if(req.query.Interval_sec) {
		params.Interval_sec = {
			value: req.query.Interval_sec,
			type: 'downner'
		}
	}

	fulltable.Select()
		.where(params)
		.order('Checkin_time')
		.offset(fetch, max)
		.query().then(result => {
		res.send(result);
	});
});
module.exports = router;
