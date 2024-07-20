const { Controller } = require('egg');

class UserController extends Controller {
	async info() {
		const ctx = this.ctx;
		const userId = ctx.query.userId;
		const user = await ctx.service.user.findOne(userId);
		ctx.body = user;
	}
}

module.exports = UserController;