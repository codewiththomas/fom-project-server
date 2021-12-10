/**
 * @link https://www.sqlitetutorial.net/sqlite-nodejs/connect/
 * @link https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
 */

const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = './database.sqlite3';

//open a database 
let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the SQLite database.');
	
	db.serialize(() => {

		let qryUsersTable = 
			"CREATE TABLE users ( " +
			"  id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"  email TEXT NOT NULL UNIQUE, " +
			"  firstname TEXT, " + 
			"  lastname TEXT, " +
			"  password TEXT, " +
			"  is_admin INTEGER DEFAULT 0 " +
			");";
		db.run(qryUsersTable, (err) => {
			if (err) {
				//table already exists, everything is fine
				console.log("Table 'users' was found in database.");
			} else {
				console.log("Table 'users' created.");
				var stmt = db.prepare("INSERT INTO users (email, firstname, lastname, password, is_admin) VALUES (?, ?, ?, ?, ?)");
				stmt.run("admin@fom-net.de", "Admindala", "Kompetenzia", "$2b$15$Tkv5KmpvY/VEGCD7L/TaMOuMoAiKvMpGrQZQJP1t.lHrKuUPSwYA6", 1);
				console.log("User 'admin@fom-net.de' (password 'test123') with role 'admin' seeded to table 'users'.");
				stmt.run("user@fom-net.de", "Jusa", "Regularius", "$2b$15$Tkv5KmpvY/VEGCD7L/TaMOuMoAiKvMpGrQZQJP1t.lHrKuUPSwYA6", 0);
				console.log("User 'user@fom-net.de' (password 'test123') with role 'regular' seeded to table 'users'.");
				stmt.finalize();
			}
		});

		let qryTasksTable =
			"CREATE TABLE tasks ( " +
			"  id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"  user_id INTEGER NOT NULL, " +
			"  title TEXT NOT NULL, " +
			"  description TEXT NULL, " +
			"  priority INTEGER NOT NULL DEFAULT 0, " +
			"  status INT NOT NULL DEFAULT 0, " +
			"  due_date TEXT NULL, " +
			"  created TEXT DEFAULT CURRENT_DATE " +
			");";
		db.run(qryTasksTable, (err) => {
			if (err) {
				//table already exists, everything is fine
				console.log("Table 'tasks' was found in database.");
			} else {
				console.log("Table 'tasks' created.");
				var stmt = db.prepare("INSERT INTO tasks (user_id, title, description, priority, status, due_date) VALUES (?, ?, ?, ?, ?, ?)");
				stmt.run("2", "First task", "Awesome description", "0", "0", "2021-10-20");
				console.log("Inserted a task.");
				stmt.run("2", "Second task", null, 0, 0, null);
				console.log("Inserted another task.");
				stmt.finalize();
			}
		});

	});

	db.close();

});

module.exports = db;