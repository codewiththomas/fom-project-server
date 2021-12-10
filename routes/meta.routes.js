const express = require("express");
const fs = require('fs');     // library for accessing filesystem
const router = express.Router();


const pack = require('../package.json');


/**
 * provides some information about the API. Most of the information are 
 * pulled from the package.json in root directory
 */
router.get('/info', async function(req, res) {

	res.status(200).json({
		apiStatus: "API is running.",
		apiName: pack.name,
		apiDescription: pack.description,
		apiVersion: pack.version
	});

});


/**
 * Gives back a 200 OK. This function can be modified for testing
 */
router.get('/test', async function(req, res) {

	res.status(200).json({ message: "Test OK" });

});


module.exports = router;