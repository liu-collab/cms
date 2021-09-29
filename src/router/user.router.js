const Router = require('koa-router');

const userRouter = new Router({ prefix: '/users' });

const { create } = require('../controller/user.controller.js');
const { verifyuser } = require('../middleware/auth.middleware.js');

userRouter.post('/', verifyuser, create);

module.exports = userRouter;
