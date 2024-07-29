const sql = require('./db.js');
const { generateInsertSql } = require('../utils');

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
	}

	getTeamsWithUserId(params, result) {
		const { userId, pageSize = 10, pageNum = 1 } = params;
		if (!userId) {
			return result({ code: 400, message: 'Missing userId parameter', success: false });
		}
		const start = (pageNum - 1) * pageSize;
		sql.query(`SELECT * FROM user_teams WHERE user_id = ? limit ${pageSize} OFFSET ${start}`, [userId], (err, res) => {
			if (err) {
				return result({
					success: false,
					message: err.sqlMessage
				}, null);
			}
			const teamIds = res?.map((item) => item.team_id);
			const teamIdsString = teamIds ? teamIds.join(',') : '';
			sql.query(`SELECT count(*) totalCount from user_teams  WHERE user_id = ?`, [userId], (err, totalRes) => {
				if (err) {
					return result({
						success: false,
						message: err.sqlMessage
					}, null);
				}
				sql.query(`SELECT * FROM team WHERE teamId IN (${teamIdsString})`, (err, teamRes) => {
					if (err) {
						result({
							success: false,
							message: err, sqlMessage
						}, null);
					}
					return result({
						success: true,
						message: 'success',
						data: {
							list: teamRes.map((item) => {
								return {
									...item,
									favor: true
								}
							}),
							total: totalRes[0].totalCount
						}
					});
				});
			})

		})
	}

	favoriteTeams(params, result) {

	}
}

module.exports = TeamModel;