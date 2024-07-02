module.exports = app => {
	const team = require('../controllers/team.controller.js');
	const router = require("express").Router();
	router.get('/getAllteams', team.getAllTeams);
	router.get('/getTeamDetails', team.getTeamDetails);
	router.post('/createTeam', team.createTeam);

	app.use('/api', router);
};
