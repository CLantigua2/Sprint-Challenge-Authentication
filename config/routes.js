const axios = require('axios');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs'); // hash paswords

const { authenticate, generateToken } = require('./middlewares');

module.exports = (server) => {
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
	// implement user registration
	const creds = req.body;
	const hash = bcrypt.hashSync(creds.password, 10);
	creds.password = hash;
	db('users')
		.insert(creds)
		.then((ids) => {
			res.status(201).json(ids);
		})
		.catch((err) => res.status(400).json(err));
}

function login(req, res) {
	// implement user login
	const creds = req.body;
	db('users')
		.where({ username: creds.username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ message: 'Welcome!', token });
			} else {
				res.status(401).json({ message: 'you shall not pass!!' });
			}
		})
		.catch((err) => res.status(400).json(err));
}

function getJokes(req, res) {
	axios
		.get('https://safe-falls-22549.herokuapp.com/random_ten')
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}
