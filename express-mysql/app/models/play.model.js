const sql = require('./db.js');

const Player = function (options) {
	this.name = options.name;
}

Player.getAllPlayers = (params, result) => {
	const {
		pageSize = 10,
		pageNum = 1,
		name,
		teamId
	} = params;
	let query = `SELECT * FROM player `;
	let totalQuery = 'SELECT count(*) totalCount from player ';
	let extraQuery = '';

	if (teamId) {
		extraQuery += ` WHERE teamId = ${teamId}`
	}
	if (name) {
		extraQuery += ` AND name  LIKE '%${name}%'`
	}

	query += extraQuery;
	totalQuery += extraQuery;


	const start = (Number(pageNum) - 1) * Number(pageSize);
	query += ` limit ${pageSize} OFFSET ${start}`

	sql.query(query, (error, res) => {
		sql.query(totalQuery, (totalErr, totalRes) => {
			if (error || totalErr) {
				result(error || totalErr, null);
				return;
			}
			result(null, { success: true, data: res, total: totalRes[0].totalCount, msg: '', code: 200 });
		})


	})
}

module.exports = Player;
