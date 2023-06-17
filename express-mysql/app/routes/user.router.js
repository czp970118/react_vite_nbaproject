module.exports = app => {

	const user = require('../controllers/user.controller.js');
  
	var router = require("express").Router();
  

	router.post('/login', user.login);
	router.post('/register', user.register);
	router.get('/getUserInfo', user.getUserInfo)
  
	app.use('/api', router);
  };
  