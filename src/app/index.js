const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const errhandle = require('./errhandle');
const userRouter = require('../router/user.router');
app.use(bodyParser());
app.use(userRouter.routes());
app.on('error', errhandle);
module.exports = app;
