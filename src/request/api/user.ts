import http from '../http';

type LoginParams = {
	userName: string;
	userPassword: string;
}

function login({ userName, userPassword }: LoginParams) {
	return http('post', '/api/login', { userName, userPassword })
}

function register({ userName, userPassword }: LoginParams) {
	return http('post', '/api/register', { userName, userPassword })
}

function getUserInfo(userName: string) {
	return http('get', '/api/getuserInfo', {userName})
}

export { login, register, getUserInfo };