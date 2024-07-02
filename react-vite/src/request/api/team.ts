import http from '../http';
function getAllTeams(params) {
	console.log('params----->', params);
	return http('get', '/api/getAllTeams', {
		...params,
		pageSize: 20
	})
}

function queryTeamDetail(id) {
	return http('get', '/api/getTeamDetails', id)
}

function createTeam(teamData) {
	return http('post', '/api/createTeam', teamData)
}

export { getAllTeams, queryTeamDetail, createTeam };