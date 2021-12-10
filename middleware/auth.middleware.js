/**
 * middleware that checks, if the request contains a valid authentication
 * token.
 */

//import dependencies
const jwt = require("jsonwebtoken");

// Middleware that gets injected in request pipeline
module.exports = (req, res, next) => {
	
	const bearerHeader = req.header("authorization");
	
	if (!bearerHeader)
	{
		return res.status(401).json({ error: "Access denied. No token provided."});
	}

	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];

	try 
	{
		
		const decoded = jwt.verify(bearerToken, process.env['jwtPrivateKey']);
		
		//with this we have access to the token in further functions
		req.user = decoded;

	} 
	catch (error) 
	{
		return res.status(401).json({ error: "Invalid token"});
	}
	
	next();

}