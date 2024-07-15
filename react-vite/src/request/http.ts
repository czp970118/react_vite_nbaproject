import axios from "axios";
import { message } from "antd";

// 设置超长时间
axios.defaults.timeout = 5000;

// 设置baseUrl
axios.defaults.baseURL = 'http://localhost:8081';

/**
 * http request拦截器
 */
axios.interceptors.request.use(
	(config: any) => {
		config.data = JSON.stringify(config.data);
		config.headers = {
			"Content-Type": 'application/json',
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
)

/**
 * http response拦截
 */
axios.interceptors.response.use(
	(response: any) => {
		if (response.data.errCode === 2) {
			console.log('过期');
		}
		return response;
	},
	(error) => {
		if (error) {
			message.error(error.message)
		}
	}
);

/**
 * 封装get方法
 * @params url 请求url
 * @private params 请求参数
 * @returns {Promise}
 */

export function get(url: string, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params,
		}).then((response) => {
			resolve(response?.data);
		})
			.catch((error) => {
				reject(error)
			})
	})
}

/**
 * 封装post方法
 * @params url 请求url
 * @params params 请求参数
 * @returns {Promise}
 */
export function post(url: string, data: any) {
	console.log('url', url);
	console.log('data', data)
	return new Promise((resolve, reject) => {
		axios.post(url, data).then((response) => {
			console.log('response', response);
			resolve(response.data);
		}).catch((error) => {
			reject(error);
		})
	})
}

//统一接口处理，返回数据
export default function (fecth, url, param) {
	return new Promise((resolve, reject) => {
		switch (fecth) {
			case "get":
				console.log("begin a get request,and url:", url);
				get(url, param)
					.then(function (response) {
						resolve(response);
					})
					.catch(function (error) {
						console.log("get request GET failed.", error);
						reject(error);
					});
				break;
			case "post":
				post(url, param)
					.then(function (response) {
						resolve(response);
					})
					.catch(function (error) {
						console.log("get request POST failed.", error);
						reject(error);
					});
				break;
			default:
				break;
		}
	});
}