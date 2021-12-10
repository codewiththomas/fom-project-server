const login = require('./login');
const createUser = require('./create-user');

module.exports = {

	'/api/auth': {
		...login,
	},
	
	'/api/users': {
		...createUser
	}
	
}