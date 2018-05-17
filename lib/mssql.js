const config = require('./config').mssqlServer;
const sql = require('mssql');
const conn = new sql.ConnectionPool(config);

conn.connect()
.then(err => {
	console.log("Connected to SQL");
	console.log(config);
})
.catch(err => {
	console.log("Cannot connected to SQL error: " + err.stack);
	console.log(config);
});

const Server = function() {
	this.request = new sql.Request(conn);
}

Server.prototype.storedProcedure = function(name, params, fn) {
	if(typeof(params) === 'function') {
		fn = params;
	}

	if(Array.isArray(params)) {
		const self = this;
		params.forEach(function(param) {
			self.request.input(param.param, param.type, param.value);
		});
	}

	this.request.execute(name, function(err, result) {
		if(err) {
			console.log(err);
			return fn(err);
		}
		fn(null, result.recordsets);
	});
}

Server.prototype.query = async function(sql, input) {
	try {
		const self = this;
		if(Array.isArray(input)) {
			input.forEach(function(param) {
				self.request.input(param.param, param.type, param.value);
			});
		}

		let result = await this.request.query(sql);
		return(result);
	} catch (err) {
		console.log(err);
		return(err);
	}
}

Server.prototype.reconnect = function() {
  console.log("Start reconnect");
  conn.close().then( err => {
    conn.connect()
    .then(err => {
        console.log("Connected to SQL");
    })
    .catch(err => {
        console.log("Cannot connected to SQL error: " + err.stack)
    });
  })
  .catch(err => {
    console.log("Closed db connection error: " + err.stack)
  });
  const self = this;
  this.request = new sql.Request(conn);
}

exports.Server = Server;
