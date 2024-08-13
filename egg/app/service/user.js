const { Service } = require('egg');
const jwt = require('jsonwebtoken');

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
		// 假设验证通过，生成token
		const token = jwt.sign({ userId: user.id }, this.ctx.app.config.jwt.secret, { expiresIn: '1d' });
		return {
			success: true,
			message: '登录成功',
			user: {
				userId: user.id,
				userName: user.userName,
				avatar: user.avatar,
				role: user.role,
				token
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
	async getUserFavorTeams(token) {
		const { userId } = jwt.verify(token, this.ctx.app.config.jwt.secret);
		const teamIdList = await this.app.mysql.select('user_teams', {
			where: { user_id: userId },
			columns: ['team_id']
		});
		if (teamIdList) {
			return {
				code: 200,
				message: '获取成功',
				success: true,
				teamIdList: teamIdList.map(item => item.team_id),
				userId
			}
		}
	}

	async favoriteTeams() {
		const ctx = this.ctx;
		const token = ctx.header.authorization;
		const { userId } = jwt.verify(token, this.ctx.app.config.jwt.secret);
		const { favor, teamId } = ctx.request.body;
		if (favor) {
			const res = await this.app.mysql.insert('user_teams', {
				user_id: userId,
				team_id: teamId,
				created_at: new Date()
			});
			if (res.affectedRows === 1) {
				return {
					success: true,
					message: '收藏成功'
				}
			} else {
				return {
					success: false,
					message: res?.message
				}
			}
		} else {
			const res = await this.app.mysql.delete('user_teams', {
				user_id: userId,
				team_id: teamId
			});
			if (res.affectedRows === 1) {
				return {
					success: true,
					message: '取消收藏成功'
				}
			} else {
				return {
					success: false,
					message: res?.message
				}
			}
		}
	}
}

module.exports = UserService;