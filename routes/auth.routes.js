const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = './database.sqlite3';

const auth = require("../middleware/auth.middleware");
const { admin, regular } = require("../middleware/roles.middleware");

//secret key stored in repl-environment
const jwtPrivateKey = process.env['jwtPrivateKey']


/**
 * login by providing the login credentials.
 */
router.post('/', async function(req, res) {

	// connect to database
	let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READ, (err) => {
		if (err) { return res.status(500).json({ error: err.message }); }
	}); 

	// check, if email is provided in request
	if (!req.body.email) {
		return res.status(400).json({ error: "E-Mail missing"});
	}
	console.log(" => Username: " + req.body.email);
	const email = req.body.email.toLowerCase();

	// check, if password is provided in request
	if (!req.body.password) {
		return res.status(400).json({ error: "Password required"});
	}
	console.log(" => Password: " + req.body.password);
	const password = req.body.password;	

	// retrieve user from database
	db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
		
		// catch unexpected errors
		if (err) {
			db.close();
			return res.status(500).json( { error: err.message } );
		}

		// return 404 error is email does not exist in database
		if (!row) {
			db.close();
			return res.status(404).json({ error: "User not found in database."});
		}

		// compare hash of password with value in databse
		const isCorrectPasswort = bcrypt.compareSync(password, row.password);
		if (!isCorrectPasswort) {
			db.close();
			return res.status(401).json({ error: "Wrong password."});
		}

		// we need roles as array - regular is always set, admin added if user is one
		const roles = ["regular"];
		if (row.is_admin === 1) {
			roles.push("admin");
		} 

		// create the token
		const token = jwt.sign({
			id: row.id,
			firstname: row.firstname,
			lastname: row.lastname,
			email: row.email,
			roles: roles
		}, jwtPrivateKey, { expiresIn: "15m" });

		//pass token to the response
		db.close();
		return res.status(200).json({
			message: "Provide this token in all future requests in the header as bearerToken ('authentication' : 'bearer <<token>>')",
			info: "Check jwt.io for the content of your token.",
			token: token
		});
		
	});

});


module.exports = router;