const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const userRouter = require('../router/user.router');
app.use(bodyParser());
app.use(userRouter.routes());

module.exports = app;
