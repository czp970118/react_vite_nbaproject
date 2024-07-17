const sql = require('./db.js');
const User = function () {

};

User.login = ({ userName, userPassword }, result) => {
	sql.query('select * from user where userName=? and userPassword=?', [userName, userPassword], (err, res) => {
		if (err) {
			result(err, null);
			return;
		}
		if (res.length) {
			result(null, {
				success: true,
				msg: '',
				code: 200,
				user: {
					userId: res[0].id,
					userName: res[0].userName,
					avatar: res[0].avatar,
					role: res[0].role
				}
			});
		} else {
			result(null, { success: false, msg: '用户名或密码错误!', code: 450 })
		}
	})
}

User.register = async ({ userName, userPassword }, result) => {
	try {
		sql.query('select * from user where userName=?', [userName], (err, res) => {
			if (!res || res.length === 0) {
				sql.query(`INSERT INTO user (userName, userPassword) VALUES (?, ?)`, [userName, userPassword], (error, r) => {
					if (error) {
						return result({ success: false, message: error.sqlMessage })
					}
					result({ success: true, code: 0, msg: '注册成功!' })
				});
			} else {
				result({ success: false, code: 1, msg: '用户名重复!' })
			}
		})
	} catch (err) {
		console.log('err', err);
	}
}

User.getUserInfo = async (userId, result) => {
	try {
		sql.query('select * from user where id=?', [userId], (error, res) => {
			console.log('userId----->', userId);
			console.log('getUserInfoerror----->', error);
			console.log('getUserInfores----->', res);
			if (error) result(error, { success: false });
			if (res.length) {
				result(res[0], null)
			} else {
				result({ code: 1, mes: '没有此用户信息!' }, null)
			}
		})

	} catch (error) {
		console.log('error', error);
		err(error);
	}
}


module.exports = User;