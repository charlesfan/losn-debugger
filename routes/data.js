const express = require('express');
const util = require('util');
const moment = require('moment-timezone');
const router = express.Router();
const mssql = require('../lib/mssql');
const schema = require('../lib/mssql-schema');
const respotority = require('../lib/respotority');

/*
router.get('/', function(req, res) {
	res.send('Herer is Debugger!!!!');
});
*/

router.get('/dev/firmware', function(req, res) {
	let url = '/data/dev/firmware?page=%s&number=%s';
	let db = new mssql.Server();
	let fulltable = new respotority.Fulltable(db);
	let params = {
		Station_GUID: {
			value: ['LOSN-607990', 'LOSN-607B21', 'LOSN-60895E'],
		}
	};
	let offset = 0;
	let max = 10;
	let desc = false;
	let resData = {
		page: offset + 1,
		number: max,
		pre: '',
		next: ''
	};

	if(req.query.start) {
		let time = moment.tz(parseInt(req.query.start, 10), "Asia/Taipei").format();
		params.Checkin_time = {
			value: time,
			type: 'upper'
		}
		url += '&start=' + req.query.start;
	}
	if(req.query.end) {
		let time = moment.tz(parseInt(req.query.end, 10), "Asia/Taipei").format();
		params.Checkin_time = {
			value: time,
			type: 'downner'
		}
		url += '&end=' + req.query.end;
	}

	if(req.query.page) {
		let page = parseInt(req.query.page, 10);
		offset = page - 1;
		resData.page = page;
	}

	if(req.query.number) {
		max = parseInt(req.query.number, 10);
		resData.number = max;
	}

	if(req.query.Interval_sec) {
		params.Interval_sec = {
			value: req.query.Interval_sec,
			type: 'downner'
		}
		url += '&Interval_sec=' + req.query.Interval_sec;
	}

	if(req.query.desc && req.query.desc === 'true') {
		desc = true;
	}

	fulltable.Select()
		.where(params)
		.order('Checkin_time', desc)
		.offset(offset*max, max + 1)
		.query().then(result => {
			if(result.length === max + 1) {
				result.pop();
				resData.next = util.format(url, offset + 2, max);
			}
			if(offset > 0) {
				resData.pre = util.format(url, offset, max);
			}
			resData.datas = result
			res.send(resData);
	});
});
module.exports = router;
