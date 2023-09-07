const Team = require('../models/team.model.js');

exports.getAllTeams = (req, res) => {
	const params = req.query;
	Team.getAllTeams(params, (err, result) => {
		if (err) {
			res.send(err)
		} else {
			res.send(result);
		}
	})
}

exports.getTeamDetails = (req, res) => {
	const params = req.query;
	Team.getTeamDetails(params, (err, result) => {
		if (err) {
			res.send(err)
		} else {
			res.send(result);
		}
	})
}


