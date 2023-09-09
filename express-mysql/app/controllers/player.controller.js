const Player = require('../models/play.model.js');

exports.getAllPlayers = function (req, res) {
	const params = req.query;
	Player.getAllPlayers(params, (err, result) => {
		if (err) {
			res.send(err)
		} else {
			res.send(result);
		}
	})
}