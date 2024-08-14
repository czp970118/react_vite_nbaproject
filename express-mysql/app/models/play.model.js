const sql = require('./db.js');
const { generateInsertSql } = require('../utils');

class PlayerModel {
	constructor() {

	}
	getAllPlayers = async (params, result) => {
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

		await sql.query(query, (error, res) => {
			sql.query(totalQuery, (totalErr, totalRes) => {
				if (error || totalErr) {
					result(error || totalErr, null);
					return;
				}
				result(null, { success: true, data: res, total: totalRes[0].totalCount, msg: '', code: 200 });
			})


		})
	}
	createPlyer = (params, result) => {
		const { teamId, number } = params;
		sql.query(`SELECT * FROM player teamId = ${teamId} AND number = ${number}`, (error, res) => {
			if (res && res.length > 0) {
				result({ success: false, msg: '该号码已占用，请重新选择号码', code: 500 });
				return;
			}
		})
		const INSERTSQL = generateInsertSql('player', params);
		sql.query(INSERTSQL, params, (err, data) => {
			if (err) {
				result(err, null);
				return;
			}
			result(null, { success: true, msg: 'created success', code: 200 });
		})
	}
	updatePlayerById = async (id, params, result) => {
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
		await sql.query(SQL, [...Object.values(params), id], (err, data) => {
			if (err) {
				result({ success: false, msg: err.sqlMessage, code: 500, });
				return;
			}
			result({ success: true, msg: 'updated success', code: 200 });
		})
	}
	findPlayer = async (params, resilt) => {
		let SQL = 'SELECT * FROM player';
		let isFirstParam = true;
		Object.keys(params).forEach((key) => {
			SQL += ` ${isFirstParam ? 'WHERE' : 'AND'} ${key} = ?`;
			isFirstParam = false;
		});
		sql.query(SQL, Object.values(params), (err, rows) => {
			console.log('err---->', err);
			console.log('rows--->', rows);
		})
	}
};

module.exports = new PlayerModel();
