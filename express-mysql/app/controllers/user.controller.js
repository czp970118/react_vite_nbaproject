const User = require('../models/user.model.js');


exports.login = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		})
	}
	const { userName, userPassword } = req.body;
	User.login({ userName, userPassword }, (err, data) => {
		if (err) {
			res.status(404).send({
				message: '用户名或密码错误!'
			});
		} else {
			res.send(data);
		}
	})
}

exports.register = (req, res) => {
	const { userName, userPassword } = req.body;
	User.register({ userName, userPassword }, (err, data) => {
		if (err) {
			res.status(404).send({})
		} else {
			res.send(data);
		}
	})
}

exports.getUserInfo = (req, res) => {
	console.log('进来userInfo了吗?')
	const { userName } = req.query;
	User.getUserInfo(userName, (result, error) => {
		if (error) {
			res.status(404).send({})
		} else {
			res.send(result);
		}
	})
}