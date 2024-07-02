const Team = require('../models/team.model.js');
const teamInstance = new Team();

exports.getAllTeams = (req, res) => {
	const params = req.query;
	teamInstance.getAllTeams(params, (err, result) => {
		if (err) {
			res.send(err)
		} else {
			res.send(result);
		}
	})
}

exports.getTeamDetails = (req, res) => {
	const params = req.query;
	teamInstance.getTeamDetails(params, (err, result) => {
		if (err) {
			res.send(err)
		} else {
			res.send(result);
		}
	})
}

exports.createTeam = (req, res) => {
	const data = req.body;
	teamInstance.createTeam(data, (err, data) => {
		if (err) {
			res.send(err)
		} else {
			res.send(data);
		}
	})
}


