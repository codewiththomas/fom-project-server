const getUsers = require('./get-users');
const createUser = require('./create-user');
const getUser = require('./get-user');
const updateUser = require('./update-user');
const deleteUser = require('./delete-user');

module.exports = {
	'/api/users': {
    ...getUsers,
		...createUser,
	},
	
	'/api/users/{id}': {
		...getUser,
		...updateUser,
		...deleteUser,
	}
	
}