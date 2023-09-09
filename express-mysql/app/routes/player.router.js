module.exports = app => {

	const player = require('../controllers/player.controller.js');

	var router = require("express").Router();

	router.get('/getAllPlayers', player.getAllPlayers);

	app.use('/api', router);

};
