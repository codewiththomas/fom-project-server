const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = './database.sqlite3';

const auth = require("../middleware/auth.middleware");
const { admin, regular } = require("../middleware/roles.middleware");


/**
 * returns a list of all users in database
 */
router.get('/', async function(req, res) {

	// connect to database
	let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READ, (err) => {
		if (err) { return res.status(500).json({ error: err.message }); }
	}); 

	let qry = "SELECT * FROM users";
	let params = [];
	let users = [];  // this array will be returned at the end

	// Fetch all datasets from database that match our query with params
	db.all(qry, params, (err, rows) => {

		if (err) {
			db.close();
			return res.status(500).json({error: err.message});
		}

		// if we'd pass out 'rows', we would provide all fields in database. Since we 
		// don't want to expose the password hash, we map each row to a new user object
		rows.forEach((row) => {

			//BTW: it would be easier just to remove the property with 'delete' keyword.
			//     Have  a look at next method, which uses 'delete' instead of mapping
			let user = {
				id: row.id,
				firstname: row.firstname,
				lastname: row.lastname,
				//password: row.password     //we do not want to pass this field
				email: row.email,
				is_admin: row.is_admin
			}

			users.push(user);              // add the user-object to the array of users

		});

		db.close();
		if (!rows) {
			return res.status(204).json(); // no content Actually this case is not required,
			                               // if we had no users we couldn't login anymore
		} else {
			return res.status(200).json(users);
		}

	});
});


/**
 * returns a single user by its unique id
 */
router.get('/:id', [auth, regular], async function(req, res) {

	// connect to database
	let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READ, (err) => {
		if (err) { return res.status(500).json({ error: err.message }); }
	}); 

	let qry = "SELECT * FROM users WHERE id = ?";
	let params = [req.params.id];

	db.get(qry, params, (err, user) => {

		if (err) {
			db.close();
			return res.status(500).json({error: err.message});
		}

		if (!user) {
			db.close();
			return res.status(404).json({error: "User not found"});		
		}
		
		db.close();
		
		delete user.password;
		return res.status(200).json(user);				

	});

});


/**
 * adds a new user
 */
router.post('/', [auth, admin], async function(req, res) {
	
	if (!req.body) {
		return res.status(400).json({ error: "Body missing."});
	}

	if (!req.body.email) {
		return res.status(400).json({ error: "Email missing."});
	}

	if (!req.body.password) {
		return res.status(400).json({ error: "Password missing."});
	}

	if (!req.body.firstname || !req.body.lastname) {
		return res.status(400).json({ error: "Firstname and lastname required."});
	}

	let isAdmin = 0;
	if (req.body.admin && req.body.admin == 1) {
		isAdmin = 1;
	}

	const qry = "SELECT * FROM users WHERE email = ?";
	const params = [];

	// connect to database
	let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READ, (err) => {
		if (err) { return res.status(500).json({ error: err.message }); }
	}); 

	db.get(qry, params, (err, row) => {

		if (err) {
			return res.status(500).json({ error: err.message });
		}

		if (row) {
			return res.status(409).json({ error: "EMail already registered." });
		}

		// Hashing the password
		const salt = bcrypt.genSaltSync(15)
		const hashedPassword = bcrypt.hashSync(req.body.password, salt)

		//we need the roles as array for the model
		let roles = ["regular"];
		if (isAdmin === 1) {
			roles.push("admin");
		}
		
		//model will be returned at the end
		user = {
			id: null,
			email: req.body.email,
			firstname: req.body.firstname || "",
			lastname: req.body.lastname || "",
			password: hashedPassword,
			roles: roles
		}	

		const insertQry = "INSERT INTO users (email, firstname, lastname, password, is_admin) VALUES (?, ?, ?, ?, ?)";
		const insertParams = [
			user.email,
			user.firstname,
			user.lastname,
			hashedPassword,
			isAdmin
		];

		db.run(insertQry, insertParams, function (err) {
			
			if (err){
					db.close();
					return res.status(400).json({ error: err.message });
			}

			console.log("LAST ID: " + this.lastID);
			user.id = this.lastID; // only works when function was NOT defined with "=>" but with "function"
														// @link: https://github.com/mapbox/node-sqlite3/issues/962
			delete user.password;
			db.close();
			return res.status(201).json(user);
		});

	});

});


/**
 * updates an user
 */
router.patch('/', [auth, regular], async function(req, res) {
	return res.status(500).json({ error: "Method not implemented yet."});
});


/**
 * deletes an user
 */
router.delete('/:id', [auth, admin], async function(req, res) {

	//TODO: Check if user exists

	//TODO: Delete all tasks of that user

	return res.status(500).json({ error: "Method not implemented yet."});
});



module.exports = router;