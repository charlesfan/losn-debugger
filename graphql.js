const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const graphql = require('graphql').graphql;

exports.start = function(app) {
	app.use(bodyParser.text({
		type: 'application/graphql'
	}));

	app.post('/graphql', (req, res) => {
		console.log(req.body);
		graphql(schema, req.body).then((result) => {
			res.send(JSON.stringify(result, null, 2));
		});
	});
}

