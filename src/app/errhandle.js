const errType = require('../constans/errType');

const errhandle = (error, ctx) => {
  let status;
  let message;
  switch (error.message) {
    case errType.USER_INFO_NOT_NULL:
      status = 401;
      message = '用户信息不能为空';
      break;
    case errType.USER_NAME_IS_EXISTS:
      status = 401;
      message = '用户名已经存在';
      break;
    case errType.PASSWORD_IS_NOT_CORRECT:
      status = 401;
      message = '密码错误';
      break;
    case errType.USER_NAME_IS_NOT_EXISTS:
      status = 401;
      message = '用户名不存在';
      break;
    case errType.TOKEN_IS_NOT_CORRECT:
      status = 401;
      message = '无效token~';
      break;
    case errType.PUBLIC_KEY_IS_NOT_CORRECT:
      status = 401;
      message = '公钥失效~';
      break;
    default:
      status = 404;
      message = 'NOT FOUND';
      break;
  }
  ctx.status = status;
  ctx.body = message;
};
module.exports = errhandle;
