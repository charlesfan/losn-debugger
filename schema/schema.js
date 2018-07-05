const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLSchema = graphql.GraphQLSchema;
const line = require('./line');

let schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'line',
		fields: {	
			name: line.getName,
			devices: line.devicesList
		}
	})
});

module.exports = schema;
