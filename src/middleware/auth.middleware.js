const UserService = require('../service/user.service');
const errType = require('../constans/errType');
const { PUBLIC_KEY } = require('../app/config');
const jwt = require('jsonwebtoken');
//验证用户是否已经注册
const verifyuser = async (ctx, next) => {
  //1.获取用户信息
  const { name, password } = ctx.request.body;

  //2.判断用户信息是否为空
  if (!name || !password) {
    const error = new Error(errType.USER_INFO_NOT_NULL);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
};
const verifyUserName = async (ctx, next) => {
  const { name } = ctx.request.body;
  //3.判断用户是否已经注册
  const result = await UserService.getUserByName(name);

  if (result.length) {
    const error = new Error(errType.USER_NAME_IS_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
};
const verifyAuth = async (ctx, next) => {
  //获取token

  const authorization = ctx.headers.authorization;
  //判断authorization是否为空
  if (!authorization) {
    const error = new Error(errType.TOKEN_IS_NOT_CORRECT);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');
  //解析token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });
    ctx.user = result;
  } catch (err) {
    console.log(err);
    const error = new Error(errType.PUBLIC_KEY_IS_NOT_CORRECT);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
};

module.exports = {
  verifyuser,
  verifyUserName,
  verifyAuth,
};
