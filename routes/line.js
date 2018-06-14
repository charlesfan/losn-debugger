const express = require('express');
const util = require('util');
const moment = require('moment-timezone');
const router = express.Router();
const mssql = require('../lib/mssql');
const schema = require('../lib/mssql-schema');
const respotority = require('../lib/respotority');

router.get('/:id/devices', function(req, res) {
	let db = new mssql.Server();
	let sql = `SELECT a.Station_UUID, b.Station_Name, b.Position, a.UUID as deviceUUID, a.IP_Address, a.FW_Version
		FROM Device_Info a LEFT JOIN Station_Info b ON a.Station_UUID = b.UUID
		WHERE a.Station_UUID in (%s) ORDER BY b.Position`;
	let stationInfo = new respotority.stationInfo(db);
	let params = {
		Line_UUID: { value: req.params.id }
	};

	stationInfo.Select(['UUID']).where(params).query().then( result => {
		let ids = '';
		result.forEach(function(value, i) {
			ids += '\'' + value.UUID + '\'';
			if(i < result.length - 1)
				ids += ', '
		});
		sql = util.format(sql, ids);
		let device = new respotority.deviceInfo(db);
		device.query(sql).then( result => {
			stationInfo.arrAssemble(result);
			device.arrAssemble(result);
			res.send(result);
		});
	});
});
module.exports = router;
