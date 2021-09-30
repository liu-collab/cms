const Router = require('koa-router');

const departmentRouter = new Router({ prefix: '/department' });
const { verifyAuth } = require('../middleware/auth.middleware');
const { verifyNameRepeat } = require('../middleware/verify.name');
const { create } = require('../controller/department.controller');

//1.创建部门
departmentRouter.post('/', verifyAuth, verifyNameRepeat('department'), create);

module.exports = departmentRouter;
