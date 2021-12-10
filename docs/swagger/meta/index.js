const info = require('./get-info');
const test = require('./test');

module.exports = {

	'/api/info': {
		...info,
	},

	'/api/test': {
		...test,
	}
	
}