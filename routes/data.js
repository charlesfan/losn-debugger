const express = require('express');
const router = express.Router();
const mssql = require('../lib/mssql');
const schema = require('../lib/mssql-schema');
const sql = require('../lib/sql');
const respotority = require('../lib/respotority');
/*
router.get('/', function(req, res) {
	res.send('Herer is Debugger!!!!');
});
*/

router.get('/', function(req, res) {
	let db = new mssql.Server();
	console.log(new Date(1526832000000));
	/*let sql = 'select top 100 * from Fulltable where Station_GUID = @id ORDER BY Checkin_time DESC';
	let input = [
		{
			param: 'id',
			type: schema.FullTable.Station_GUID,
			value: 'LOSN-607b21'
		}
	]
	db.query(sql, input).then(result => {
		res.send(result.recordset);
	});*/
	/*
	let params = {};
	if(req.query.Station_GUID) {
		params.Station_GUID = req.query.Station_GUID;
	}

	let select = new sql.Select('Fulltable', params);
	select.top('100').where({Station_GUID: "\'LOSN-607b21\'"}).run(db).then(result => {
		res.send(result);
	});
	*/
	let fulltable = new respotority.Fulltable(db);
	let params = {};
	let range = [];
	var fetch = 0;
	var max = 10;
	if(req.query.start) {
		range[0] = new Date(parseInt(req.query.start, 10)).toISOString();
		//range[0] = '2018-05-20 00:00:00';
	}
	if(req.query.end) {
		range[1] = new Date(parseInt(req.query.end, 10)).toISOString();
		//range[1] = '2018-05-21 23:59:00';
	}
	if(req.query.page) {
		fetch = req.query.page;
	}
	if(req.query.max) {
		max = req.query.max;
	}

	fulltable.Select().where(params)
		.range('Checkin_time', range)
		.order('Checkin_time')
		.offset(fetch, max)
		.query().then(result => {
		res.send(result);
	});
	/*
	fulltable.Select().top('100').where(params);
	res.send(fulltable.getSQL());
	*/
});
module.exports = router;
