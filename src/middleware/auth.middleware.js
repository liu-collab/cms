const UserService = require('../service/user.service');
const errType = require('../constans/errType');
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
};

module.exports = {
  verifyuser,
  verifyUserName,
};
