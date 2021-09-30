const Router = require('koa-router');

const userRouter = new Router({ prefix: '/users' });

const {
  create,

  change,
} = require('../controller/user.controller.js');
const {
  verifyuser,

  verifyAuth,
} = require('../middleware/auth.middleware.js');
const passwordhandle = require('../middleware/password.middleware');
const { verifyNameRepeat } = require('../middleware/verify.name');
const {
  remove,
  list,
  detail,
} = require('../middleware/lookupAndDelete.middleware');
//1.创建用户
userRouter.post(
  '/',
  verifyuser,
  verifyNameRepeat('users'),
  passwordhandle,
  create
);
//2.删除用户
userRouter.delete('/:id', verifyAuth, remove('users'));
//3.修改用户
userRouter.patch('/:id', verifyAuth, verifyNameRepeat('users'), change);
//5.查询用户列表
userRouter.get('/list', list('users'));
//4.查询用户
userRouter.get('/:id', detail('users'));

module.exports = userRouter;
