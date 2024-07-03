const PlayerModel = require('../models/play.model.js');
const getAllPlayers = function (req, res) {
	const params = req.query;
	PlayerModel.getAllPlayers(params, (err, result) => {
		if (err) {
			res.send(err)
		} else {
			res.send(result);
		}
	})
}

const createPlayer = function (req, res) {
	const { teamId, number, position, age, describe, name, capability } = req.body;
	PlayerModel.getAllPlayers({ teamId }, (err, result) => {
		if (err) {
			res.send(err)
		} else {
			if (result.data.find((play) => play.number === number)) {
				res.send({
					success: false,
					message: '球衣号码已被占用，请选择其他号码'
				})
			} else {
				Player.createPlyer(
					{
						name,
						teamId,
						age,
						number,
						position: position.join(','),
						capability,
						describe
					}, (err, result) => {
						if (err) {
							res.send(err)
						} else {
							res.send({
								success: true,
								...result
							})
						}
					})
			}
		}
	});
};

const updatePlayer = function (req, res) {
	const { teamId, number } = req.body;
	PlayerModel.findPlayer({ teamId, number }, (err, result) => {

	})
}

const removePlayerFromTeam = function (req, res) {
	const { id } = req.body;
	PlayerModel.updatePlayerById(id, { teamId: null }, (result) => {
		res.send(result);
	})
};

module.exports = { getAllPlayers, createPlayer, updatePlayer, removePlayerFromTeam }