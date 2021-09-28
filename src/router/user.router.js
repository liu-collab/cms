const Router = require('koa-router');

const userRouter = new Router({ prefix: '/users' });

const { create } = require('../controller/user.controller.js');

userRouter.post('/', create);

module.exports = userRouter;
