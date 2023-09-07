module.exports = app => {

	const team = require('../controllers/team.controller.js');

	var router = require("express").Router();

	router.get('/getAllteams', team.getAllTeams);

	router.get('/getTeamDetails', team.getTeamDetails);

	app.use('/api', router);
};
