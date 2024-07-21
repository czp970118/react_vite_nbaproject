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
				token: null
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
			// token: this.app.jwt.sign({
			// 	id: user.id,
			// 	userName: user.userName,
			// 	userPassword: user.userPassword
			// }, this.app.config.jwt.secret, {
			// 	expiresIn: '1d'
			// })
		}
	}
}

module.exports = UserService;