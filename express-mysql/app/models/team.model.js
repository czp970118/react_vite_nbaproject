const sql = require('./db.js');

const Team = function () {

};

Team.getAllTeams = (params, result) => {
	const {
		pageSize = 10,
		pageNum = 1
	} = params;
	const start = (Number(pageNum) - 1) * Number(pageSize);
	console.log('start', start);
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
}


module.exports = Team;