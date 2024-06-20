const sql = require('./db.js');

const Player = function (options) {
	this.name = options.name;
}

Player.getAllPlayers = (params, result) => {
	const {
		pageSize,
		pageNum,
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

	if (pageNum && pageSize) {
		const start = (Number(pageNum) - 1) * Number(pageSize);
		query += ` limit ${pageSize} OFFSET ${start}`
	}

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

Player.createPlyer = (params, result) => {
	sql.query('INSERT INTO player (name ,teamId, age, number, position, capability ) VALUES (?, ?, ?, ?, ?, ?)', params, (err, data) => {
		if (err) {
			result(err, null);
			return;
		}
		result(null, { success: true, msg: 'created success', code: 200 });
	})
}

Player.updatePlayerById = (id, params, result) => {
	let SQL = 'UPDATE player SET';
	let isFirstParam = true;
	for (let key in params) {
		if (!isFirstParam) {
			SQL += ', ';
		}
		SQL += ` ${key} = ?`;
		isFirstParam = false;
	}
	SQL += ' WHERE id = ?'
	sql.query(SQL, [...Object.values(params), id], (err, data) => {
		if (err) {
			result({ success: false, msg: err.sqlMessage, code: 500, });
			return;
		}
		result({ success: true, msg: 'updated success', code: 200 });
	})
}


module.exports = Player;
