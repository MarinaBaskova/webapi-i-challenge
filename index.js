// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send('Welcome to the App');
});

server.listen(8000, () => {
	console.log('Server is listening on port 8000');
});
