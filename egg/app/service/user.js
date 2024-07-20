const { Service } = require('egg');

class UserService extends Service {
	async findOne(userId) {
		const user = await this.app.mysql.get('user', { id: userId })
		return { user };
	}
}

module.exports = UserService;