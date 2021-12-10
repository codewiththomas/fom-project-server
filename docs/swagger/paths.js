const auth = require('./auth');
const meta = require('./meta');
const tasks = require('./tasks');
const users = require('./users');

module.exports = {
    paths: {
			...meta,
			...auth,
			...tasks,
			...users
		},
};