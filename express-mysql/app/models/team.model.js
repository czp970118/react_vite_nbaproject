const sql = require('./db.js');
const { generateInsertSql } = require('../utils');
const axios = require('axios');

class TeamModel {
	constructor() {
	}

	getAllTeams(params, result) {
		const { pageSize = 10, pageNum = 1 } = params;
		const start = (pageNum - 1) * pageSize;
		try {
			sql.query(`SELECT * FROM team limit ${pageSize} OFFSET ${start}`, (err, team) => {
				sql.query("SELECT count(*) totalCount from team", (totalErr, totalRes) => {
					if (err) {
						result(null, err);
						return;
					}
					const total = totalRes[0].totalCount;
					result(null, {
						code: 200,
						message: '',
						success: true,
						data: {
							list: team,
							total
						}
					});
				})

			})
		} catch (err) {
			// console.error('error------->', err, err.stack, '-----', result, '--------');
			console.log('error-->', err)
			result(null, err);
		}
	}

	getTeamDetails(params, result) {
		const { id } = params;
		if (!id) {
			return result({ code: 400, message: 'Missing teamId parameter', success: false });
		}
		try {
			sql.query(`SELECT * FROM team WHERE teamId = ?`, [id], (err, res) => {
				if (err) return result({ message: err, success: false });
				if (res.length === 0) {
					return result({ code: 404, message: 'Team not found', success: false });
				}
				result({
					code: 200,
					message: 'success',
					success: true,
					data: res[0]
				});
			});

		} catch (err) {
			result(null, err);
		}
	}

	createTeam(params, result) {
		const INSERTSQL = generateInsertSql('team', params);
		try {
			sql.query(INSERTSQL, params, (err, res) => {
				if (!err) {
					result(null, { success: true, msg: 'created success', code: 200 });
				} else {
					result({
						errorMeg: err.sqlMessage,
						success: false,
					}, null);
				}
			})
		} catch (err) {
			result(err, null);
		}
	}

	getTeamsWithoutUserId(userId, result) {
		// const userResult = 
	}
	favoriteTeams(params, result) {
		const { userId } = params;
		axios.get(`http://127.0.0.1:7001/user/getUserInfo?userId=${userId}`).then((res) => {
			console.log('res--->', res.data);
			result(null, { success: true, msg: '', data: res.data })
		})
	}
}

module.exports = TeamModel;