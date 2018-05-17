const express = require('express');
const router = express.Router();
const mssql = require('../lib/mssql');
const schema = require('../lib/mssql-schema');
const sql = require('../lib/sql');
/*
router.get('/', function(req, res) {
	res.send('Herer is Debugger!!!!');
});
*/

router.get('/', function(req, res) {
	let db = new mssql.Server();
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
	let params = {};
	if(req.query.Station_GUID) {
		params.Station_GUID = req.query.Station_GUID;
	}

	let select = new sql.Select('Fulltable', params);
	select.top('100').where({Station_GUID: "\'LOSN-607b21\'"}).run(db).then(result => {
		res.send(result);
	});
});
module.exports = router;
