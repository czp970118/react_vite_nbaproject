/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1719248452063_8374';

  // 添加 view 配置项
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.mysql = {
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'nba'
    },
  }

  config.news = {
    pageSize: 1,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  }

  config.jwt = {
    secret: 'nba_secret'
  }

  config.cors = {
    origin: (ctx) => {
      if (ctx.header.origin === 'http://localhost:5173') {
        return ctx.header.origin; // 只允许来自指定域名的请求
      }
      return null; // 其他域名请求不允许
    },
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true, // 允许携带cookie
  }

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://localhost:5173']
  }


  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
