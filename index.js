// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send('Welcome to the App');
});

// GET Users

server.get('/users', (req, res) => {
	db
		.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json({ error: err, message: 'The users information could not be retrieved.' });
		});
});

server.listen(8000, () => {
	console.log('Server is listening on port 8000');
});

// GET User by ID

server.get('/users/:id', (req, res) => {
	db
		.findById(req.params.id)
		.then((user) => {
			if (user.length === 0) {
				res.status(404).json({ message: 'The user with the specified ID does not exist.' });
			}
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The user information could not be retrieved.' });
		});
});
