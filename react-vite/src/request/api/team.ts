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
interface UserUnFavorParams {
	userId?: number;
	pageSize: number;
	pageNum: number;
}
/**
 * 获取用户未收藏的球队
 * @param params 
 * @returns 
 */

function getTeamsWithoutUserId(params: UserUnFavorParams) {
	return http('get', '/api/getTeamsWithoutUserId', params)
}

/**
 * 获取用户收藏的球队
 * @param params 
 * @returns 
 */
function getTeamsWithUserId(params) {
	return http('get', '/api/getTeamsWithUserId', params)
}
interface FavoriteParams {
	userId?: number;
	teamId: string;
	favor: boolean;
}
/**
 * 用户收藏球队/取消收藏球队
 * @param {FavoriteParams} params
 *  @property {string | number} userId - 用户的唯一标识符。
 * 	@property {string} teamId - 以逗号分隔可以批量收藏
 * 	@property {boolean} favor - 是否收藏
 * @returns
 */
function favoriteTeams(params: FavoriteParams) {
	return http('post', '/api/favoriteTeams', params)
}

export { getAllTeams, queryTeamDetail, createTeam, getTeamsWithoutUserId, favoriteTeams, getTeamsWithUserId };