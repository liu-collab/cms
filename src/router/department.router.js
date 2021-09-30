const Router = require('koa-router');

const departmentRouter = new Router({ prefix: '/department' });
const { verifyAuth } = require('../middleware/auth.middleware');
const { verifyNameRepeat } = require('../middleware/verify.name');
const { create, change } = require('../controller/department.controller');
const {
  remove,
  list,
  detail,
} = require('../middleware/lookupAndDelete.middleware');
//1.创建部门
//验证是否登录
//验证部门名称是否重复
//创建部门
departmentRouter.post('/', verifyAuth, create);
//2.删除部门
departmentRouter.delete('/:id', verifyAuth, remove('department'));
//4.获取部门列表
departmentRouter.get('/list', list('department'));
//3.获取单个部门
departmentRouter.get('/:id', detail('department'));
departmentRouter.patch(
  '/:id',
  verifyAuth,
  verifyNameRepeat('department'),
  change
);

module.exports = departmentRouter;
