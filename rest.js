const bodyParser = require('body-parser');

exports.start = function(app) {
	app.use('/data', require('./routes/data'));
	app.use('/line', require('./routes/line'));
	app.use('/device', require('./routes/device'));
	app.use('/station', require('./routes/station'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	/*
	app.use('/', function(req, res) {
		res.send('losen debugger');
	});
	*/
}

