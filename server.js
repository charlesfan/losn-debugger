const bodyParser = require('body-parser');

exports.start = function(app) {
	app.use('/data', require('./routes/data'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use('/', function(req, res) {
		res.send('losen debugger');
	});
}

