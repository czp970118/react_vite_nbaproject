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
	const { teamId, number, position, age, introduction, name, capability } = req.body;
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
				PlayerModel.createPlyer(
					{
						name,
						teamId,
						age,
						number,
						position: position.join(','),
						capability,
						introduction
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
	const { teamId, number, id, age, avatar, capability, introduction, name, position } = req.body;
	PlayerModel.updatePlayerById(id, { teamId, number, age, avatar, capability, name, position, introduction }, result => {
		res.send(result);
	})
}

const removePlayerFromTeam = function (req, res) {
	const { id } = req.body;
	PlayerModel.updatePlayerById(id, { teamId: null }, (result) => {
		res.send(result);
	})
};

module.exports = { getAllPlayers, createPlayer, updatePlayer, removePlayerFromTeam }