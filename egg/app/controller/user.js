const { Controller } = require('egg');

class UserController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'hi, user interface';
	}
	async getUserInfo() {
		const { ctx } = this;
		const { id } = ctx.params;
		ctx.body = `hi, getUserInfo ${id}`;
	}
}

module.exports = UserController;