const { Controller } = require('egg');

class UserController extends Controller {
	async getUserInfo() {
		const ctx = this.ctx;
		const userId = ctx.query.userId;
		const userInfo = await this.ctx.service.user.findOne(userId);
		ctx.body = userInfo;
	}

	async userLogin() {
		const ctx = this.ctx;
		const { userName, userPassword } = ctx.request.body;
		try {
			const res = await this.ctx.service.user.login({ userName, userPassword });
			ctx.body = res;
		} catch (error) {
			ctx.body = {
				success: false,
				message: err.message,
			};
		}
	}
}

module.exports = UserController;