const sql = require('./db.js');

const Player = function (options) {
	this.name = options.name;
}

Player.getAllPlayers = (params, result) => {
	let query = 'SELECT * FROM player'
	sql.query(query, (error, res) => {
		if (error) {
			result(error, null);
			return;
		}
		result(null, { success: true, data: res, msg: '', code: 200 });
	})
}

module.exports = Player;
