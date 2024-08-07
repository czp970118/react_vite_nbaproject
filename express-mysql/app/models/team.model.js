const sql = require('./db.js');
const { generateInsertSql } = require('../utils.js');
const axios = require('axios');

class TeamModel {
	constructor() {
	}

	getUserFavorTemas = async function (token) {
		try {
			const res = await axios.get(`http://127.0.0.1:7001/user/getUserFavorTeams?token=${token}`);
			return res.data;
		} catch (error) {
			throw new Error("Failed to get user favorite teams");
		}
	};

	getTeamList = async function (start, pageSize) {
		return new Promise((resolve, reject) => {
			sql.query(`SELECT * FROM team LIMIT ${pageSize} OFFSET ${start}`, (err, results) => {
				if (err) return reject(err);
				resolve({
					success: true,
					data: results
				});
			});
		});
	}

	getTotalCount = async function () {
		return new Promise((resolve, reject) => {
			sql.query(`SELECT COUNT(*) AS totalCount FROM team`, (err, result) => {
				if (err) return reject(err);
				resolve({
					success: true,
					total: result[0].totalCount
				});
			})
		});
	};

	async getAllTeams(params, result) {
		const { pageSize = 10, pageNum = 1, token } = params;
		const start = (pageNum - 1) * pageSize;
		try {
			// 验证页码参数
			if (isNaN(pageSize) || isNaN(pageNum) || pageSize < 1 || pageNum < 1) {
				throw new Error("Invalid page number or page size");
			}
			const [listRes, totalRes, favorTeamIdsRes] = await Promise.all([
				this.getTeamList(start, pageSize),
				this.getTotalCount(),
				this.getUserFavorTemas(token)
			])

			if (listRes.success && totalRes.success && favorTeamIdsRes.success) {
				const newList = listRes.data.map((item) => {
					return favorTeamIdsRes.teamIdList.includes(item.teamId) ? { ...item, favor: true } : { ...item, favor: false }
				})
				result(null, {
					code: 200,
					message: '',
					success: true,
					data: {
						list: newList,
						total: totalRes.total,
					}
				});
			}

		} catch (err) {
			result(err, null);
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
							message: err.sqlMessage
						}, null);
					}
					return result({
						success: true,
						message: 'success',
						data: {
							list: (teamRes && teamRes.length) ? teamRes.map((item) => {
								return {
									...item,
									favor: true
								}
							}) : [],
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