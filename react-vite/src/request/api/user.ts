import http from '../http';
const userBaseUrl = 'http://127.0.0.1:7001';

type LoginParams = {
	userName: string;
	userPassword: string;
}

function login({ userName, userPassword }: LoginParams) {
	return http('post', `${userBaseUrl}/user/login`, { userName, userPassword })
}

function register({ userName, userPassword }: LoginParams) {
	return http('post', `${userBaseUrl}/user/register`, { userName, userPassword })
}

function getUserInfo(userId: string | number) {
	return http('get', `${userBaseUrl}/user/getUserInfo`, { userId })
}

function editUser(params: any) {
	return http('post', `${userBaseUrl}/user/edit`, params)
}

interface FavoriteParams {
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
	return http('post', `${userBaseUrl}/user/favoriteTeams`, params)
}

export { login, register, getUserInfo, editUser, favoriteTeams };