/**
 * Web API written in node.js using the express.js-framework. If you are
 * using this script within replit.com set the environment to node.js!
 */

//Client link
//https://replit.com/join/vedvabmcdr-saschafom

// In strict mode all variables have to be declared
// @link: https://www.w3schools.com/js/js_strict.asp
'use strict';


// import external dependencies (packages). Make sure that those packages
// are installed to your repl-environment
// @link: https://docs.replit.com/archive/quick-start#adding-packages
const express = require('express');              // library for an easy-to-use web server
const swaggerJsDoc = require('swagger-jsdoc');   // required for automated documentation
const swaggerUi = require('swagger-ui-express'); // required for automated documentation
const cors = require('cors');                    // required to enable Cross Origin Ressource Sharing


// import internal dependencies
const docs = require('./docs/swagger');
const db = require('./persistence/database');
const logger = require('./middleware/logger.middleware');
const authRouter = require('./routes/auth.routes');
const metaRouter = require('./routes/meta.routes');
const taskRouter = require('./routes/task.routes');
const userRouter = require('./routes/user.routes');


// setup the express server
const app = express();
const port = process.env.port || process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(docs));
app.use("/api", metaRouter);
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

// here a cool way how to use public/static files. With this the
// css & js files can be accessed (see static/index.html)
app.use('/', express.static('static'));

// Default response for any route that is unknown
app.use((req, res) => { 
	res.status(404).send({
		error: "Endpoint '" + req.path + "' does not exist"
	}); 
});


// start the webserver
app.listen(port, () => { console.log("Server is up"); });