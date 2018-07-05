const util = require('util');
const mssql = require('./mssql');
const respotority = require('./respotority');

exports.getDaives = function(id, fn) {
	let db = new mssql.Server();
	let sql = `SELECT a.Station_UUID, b.Station_Name, b.Position, a.UUID as deviceUUID, 
		a.IP_Address, a.FW_Version, a.Rebooted
		FROM Device_Info a LEFT JOIN Station_Info b ON a.Station_UUID = b.UUID
		WHERE a.Station_UUID in (%s) ORDER BY b.Position`;
	let stationInfo = new respotority.stationInfo(db);
	let params = {
		Line_UUID: { value: id }
	};

	stationInfo.Select(['UUID']).where(params).query().then( result => {
		if(result.length <= 0) {
			return 'Not Found';
		}
		let ids = '';
		result.forEach(function(value, i) {
			ids += '\'' + value.UUID + '\'';
			if(i < result.length - 1)
				ids += ', '
		});
		sql = util.format(sql, ids);
		let device = new respotority.deviceInfo(db);
		device.query(sql).then(result => {
			stationInfo.arrAssemble(result);
			device.arrAssemble(result);
			if(fn) {
				return fn(result);
			}
			return result;
		});
	});
}

exports.getLineName = function(id) {
	let db = new mssql.Server();
	let lineInfo = new respotority.lineInfo(db);
	let params = {
		UUID: { value: id }
	};

	lineInfo.Select(['UUID']).where(params).query().then( result => {
		if(result.length <= 0) {
			return 'Not Found';
		}
	});
}
