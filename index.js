// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send('Welcome to the App');
});

// GET Users

server.get('/api/users', (req, res) => {
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

server.get('/api/users/:id', (req, res) => {
	// console.log('PARAMS', req.params);
	// console.log(req);
	db
		.findById(req.params.id)
		.then((user) => {
			console.log(user);
			if (user.length === 0) {
				res.status(404).json({ message: 'The user with the specified ID does not exist.' });
			}
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json({ error: 'The user information could not be retrieved.' });
		});
});

// POST - create a user

server.post('/api/users', (req, res) => {
	const newUserInfo = req.body;
	if (!newUserInfo.hasOwnProperty('name') || !newUserInfo.hasOwnProperty('bio')) {
		res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	}
	db
		.insert(newUserInfo)
		.then((users) => {
			res.status(201).json(users);
		})
		.catch((err) => {
			res.status(500).json({ error: 'There was an error while saving the user to the database' });
		});
});

// DELETE

server.delete('/api/users/:id', (req, res) => {
	db
		.remove(req.params.id)
		.then((userID) => {
			console.log('DELETE', userID);
			if (!userID) {
				res.status(404).json({ message: 'The user with the specified ID does not exist.' });
			}
			res.status(204).end();
		})
		.catch((err) => {
			res.status(500).json({ error: 'The user could not be removed' });
		});
});
