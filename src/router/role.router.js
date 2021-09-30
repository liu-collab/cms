const Router = require('koa-router');
const roleRouter = new Router({ prefix: '/role' });
const { verifyNameRepeat } = require('../middleware/verify.name');
const { verifyAuth } = require('../middleware/auth.middleware');

const { create, change } = require('../controller/role.controller');
const {
  remove,
  list,
  detail,
} = require('../middleware/lookupAndDelete.middleware');
//1.创建角色
roleRouter.post('/', verifyNameRepeat('role'), create);
//2.删除角色

roleRouter.delete('/:id', verifyAuth, remove('role'));
//4.获取角色列表
roleRouter.get('/list', list('role'));
//3.获取单个角色
roleRouter.get('/:id', detail('role'));
//5.修改角色
roleRouter.patch('/:id', verifyAuth, verifyNameRepeat('role'), change);

module.exports = roleRouter;
