const { Service } = require('egg');

class UserService extends Service {
	async findOne(userId) {
		const user = await this.app.mysql.get('user', { id: userId });
		if (!user) {
			return {
				success: false,
				message: '用户不存在',
				user: null
			}
		}
		return {
			success: true,
			message: '查询成功',
			user
		};
	}
	async login({ userName, userPassword }) {
		const user = await this.app.mysql.get('user', { userName, userPassword });
		if (!user) {
			return {
				success: false,
				message: '用户名或密码错误',
				// token: null
			}
		}
		return {
			success: true,
			message: '登录成功',
			user: {
				userId: user.id,
				userName: user.userName,
				avatar: user.avatar,
				role: user.role
			},
		}
	}

	async edit(params) {
		const user = await this.app.mysql.update('user', params);
		if (!user) {
			return {
				success: false,
				message: '更新失败',
			}
		} else {
			const newUser = await this.app.mysql.get('user', { id: params.id });
			return {
				success: true,
				message: '更新成功',
				user: {
					userId: newUser.id,
					userName: newUser.userName,
					avatar: newUser.avatar,
					role: newUser.role
				}
			}
		}
	}
}

module.exports = UserService;