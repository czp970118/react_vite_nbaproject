import http from '../http';
function getAllTeams(params) {
	return http('get', '/api/getAllTeams', params)
}

function queryTeamDetail(id) {
	return http('get', '/api/getTeamDetails', id)
}

function createTeam(teamData) {
	return http('post', '/api/createTeam', teamData)
}


type TeamsWiothoutUserParams = {
	userId?: number;
	pageSize: number;
	pageNum: number;
}

function getTeamsWithoutUserId(params: TeamsWiothoutUserParams) {
	return http('get', '/api/getTeamsWithoutUserId', params)
}

export { getAllTeams, queryTeamDetail, createTeam, getTeamsWithoutUserId };