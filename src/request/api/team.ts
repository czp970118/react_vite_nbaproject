import http from '../http';

function getAllTeams(params) {
	return http('get', '/api/getAllTeams', params)
}

export { getAllTeams };