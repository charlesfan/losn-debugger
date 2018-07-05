const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLList = graphql.GraphQLList;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLID = graphql.GraphQLID;
const GraphQLInt = graphql.GraphQLInt;
const handler = require('../lib/handler');

let DeviceType = new GraphQLObjectType({
	name: 'Device',
	fields: () => { 
		return {
			deviceUUID: {
				type: GraphQLID,
				resolve (device, root, context) {
					return device.deviceUUID;
				}
			},
			stationName: {
				type: GraphQLString,
				resolve (device) {
					return device.stationName;
				}
			},
			position: {
				type: GraphQLInt,
				resolve (device) {
					return device.position;
				}
			},
			stationUUID: {
				type: GraphQLID,
				resolve (device) {
					return device.GraphQLID;
				}
			},
			ipAddress: {
				type: GraphQLString,
				resolve (device) {
					return device.ipAddress;
				}
			},
			fwVersion: {
				type: GraphQLString,
				resolve (device) {
					return device.fwVersion;
				}
			},
			rebooted: {
				type: GraphQLBoolean,
				resolve (device) {
					return device.rebooted;
				}
			}
		}
	}
});

exports.devicesList = { 
	args: {
		id: {
			name: 'lineId',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	type: new GraphQLList(DeviceType),
	resolve: (root, {id}) => {
		let result = new Promise((resolve) => {
			handler.getDaives(id, function(result) {
				resolve(result);
			});
		});
		return result;
	}
}

exports.getName = {
	args: {
		id: {
			name: 'lineId',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	type: GraphQLString,
	resolve: (root, {id}) => {
		let result = new Promise((resolve) => {
			handler.getDaives(id, function(result) {
				resolve(result);
			});
		});
		return result;
	}
}
