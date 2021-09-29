const Router = require('koa-router');

const userRouter = new Router({ prefix: '/users' });

const { create } = require('../controller/user.controller.js');
const { verifyuser } = require('../middleware/auth.middleware.js');
const passwordhandle = require('../middleware/password.middleware');

userRouter.post('/', verifyuser, passwordhandle, create);

module.exports = userRouter;
