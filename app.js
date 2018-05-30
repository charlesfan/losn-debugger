const express = require('express');
const app = new express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 8080;

let endpoint = './' + (process.argv[2] || 'server');

console.log('loading endpoint:', endpoint);
require(endpoint).start(app);

app.listen(PORT);
