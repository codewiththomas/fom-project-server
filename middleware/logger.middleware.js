module.exports = (req, res, next) => {

	const dt = new Date(Date.now());

	console.log(dt.toUTCString() + ": " + req.method + " " + req.path + " was called");
	
	next();

};