const errType = require('../constans/errType');
const md5password = require('../utils/passwordhandle');
const LoginService = require('../service/login.service');
const verifyLogin = async (ctx, next) => {
  //1.获取用户信息
  const { name, password } = ctx.request.body;
  //2.判断用户信息是否为空
  if (!name || !password) {
    const error = new Error(errType.USER_INFO_NOT_NULL);
    return ctx.app.emit('error', error, ctx);
  }
  //2.判断用户名是否存在

  const result = await LoginService.getNameById(name);

  const user = result[0];

  if (!user) {
    const error = new Error(errType.USER_NAME_IS_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  //3.判断密码是否正确
  if (md5password(password) !== user.password) {
    const error = new Error(errType.PASSWORD_IS_NOT_CORRECT);
    return ctx.app.emit('error', error, ctx);
  }
  ctx.user = user;
  await next();
};

module.exports = {
  verifyLogin,
};
