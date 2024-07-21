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

export { login, register, getUserInfo };