const Router = require('koa-router');

const userRouter = new Router({ prefix: '/users' });

const { create, remove, change } = require('../controller/user.controller.js');
const {
  verifyuser,
  verifyUserName,
  verifyAuth,
} = require('../middleware/auth.middleware.js');
const passwordhandle = require('../middleware/password.middleware');

//1.创建用户
userRouter.post('/', verifyuser, verifyUserName, passwordhandle, create);
//2.删除用户
userRouter.delete('/:id', verifyAuth, remove);
//3.修改用户
userRouter.patch('/:id', verifyAuth, verifyUserName, change);
module.exports = userRouter;
