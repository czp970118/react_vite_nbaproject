/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  console.log('this.app.jwt.sign', jwt)
  router.get('/', controller.home.index);
  router.get('/user/getUserInfo', controller.user.getUserInfo);
  router.post('/user/login', controller.user.userLogin);
  router.post('/user/edit', controller.user.userEdit)
};
