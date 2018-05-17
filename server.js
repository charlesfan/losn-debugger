exports.start = function(app) {
	app.use('/debug', require('./routes/debug'));
	app.use('/', function(req, res) {
		res.send('losen debugger');
	});
}

