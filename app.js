const express = require('express');
const app = new express();
const cors = require('cors');
const _ = require('lodash');
app.use(cors());

const PORT = process.env.PORT || 8080;

let endpoints = _.drop(process.argv, 2);

load(endpoints);

app.listen(PORT);

function load(arr) {
	let obj = arr.pop();
	let endpoint = require('./' + obj);

	if(endpoint.hasOwnProperty('start')) {
		console.log('loading endpoint:', obj);
		endpoint.start(app);
		if(endpoints.length > 0) {
			load(arr)
		}
	}
}
