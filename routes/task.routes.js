const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const { admin, regular } = require("../middleware/roles.middleware");

const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = './database.sqlite3';

/**
 * returns a list of all tasks in database
 */
router.get('/', async function(req, res) {
	
	// connect to database
	let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READ, (err) => {
		if (err) { return res.status(500).json({ error: err.message }); }
	}); 

	const qry = "SELECT * FROM tasks";
	const params = [];

	db.all(qry, params, (err, rows) => {

		if (err) {
			db.close();
			return res.status(500).json({ error: err.message });
		}

		db.close();
		return res.status(200).json(rows);

	});
	
});


/**
 * returns a single task
 */
router.get('/:id', [auth, regular], async function(req, res) {
	
	// connect to database
	let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READ, (err) => {
		if (err) { return res.status(500).json({ error: err.message }); }
	}); 

	const qry = "SELECT * FROM tasks WHERE id = ?";
	const params = [req.params.id];

	db.get(qry, params, (err, row) => {

		if (err) {
			db.close();
			return res.status(500).json({ error: err.message });
		}

		if (!row) {
			db.close();
			return res.status(404).json( { error: "Task not found."});
		}

		db.close();
		return res.status(200).json(row);

	});

});


/**
 * adds a new task 
 */
router.post('/', async function(req, res) {

	let body = req.body;

	// connect to database
	let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READ, (err) => {
		if (err) { return res.status(500).json({ error: err.message }); }
	}); 

	qry = "INSERT INTO tasks (user_id, title, description, priority, status, due_date, created) VALUES (?, ?, ?, ?, ?, ?, ?)";
	params = [];

	let today = new Date();
	
	let newModel = {
		id: null,
		user_id: 1,
		title: "",
		description: null,
		priority: 0,
		status: 0,
		due_date: null,
		created: today.toISOString().split('T')[0]
	};

	if (!body.title) {
		return res.status(400).json({ message: "You must provide a title."});
	}
	newModel.title = body.title;
	newModel.description = body.description || null;

 	if (body.priority < -1 || body.priority > 1) {
		return res.status(400).json({ message: "Invalid priority. Must be between -1 and 1."});
	}
	newModel.priority = body.priority;

	if (!body.due_date || !isNaN(Date.parse(body.due_date))) {
		newModel.due_date = body.due_date;
	}



		var qry = "INSERT INTO tasks (user_id, title, description, priority, status, due_date, created) VALUES (?, ?, ?, ?, ?, ?, ?)";
		var params = [newModel.user_id, newModel.title, newModel.description, newModel.priority, newModel.status, newModel.due_date, newModel.created];

		db.run(qry, params, function(err, result) {
	
			if (err) {
				return res.status(500).json({ error: "Can't create new entity: " + err.message });
			}

			newModel.id = this.lastID;
			return res.status(201).json(newModel);

		});


	db.close();

});


/**
 * updates an existing task
 */
router.patch('/', async function(req, res) {
	//TODO: Check if tasks exists
	//TODO: Update the task
	return res.status(500).json({ error: "Method not implemented yet."});
});


/**
 * deletes a task
 */
router.patch('/', async function(req, res) {
	//TODO: Check if task exists
	//TODO: Delete
	return res.status(500).json({ error: "Method not implemented yet."});
});



module.exports = router;