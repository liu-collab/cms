const UserService = require('../service/user.service');
//验证用户是否已经注册

const verifyuser = async (ctx, next) => {
  //1.获取用户信息
  const { name, password } = ctx.request.body;

  //2.判断用户信息是否为空
  if (!name || !password) {
    ctx.body = '用户信息为空';
    return;
  }
  //3.判断用户是否已经注册
  const result = await UserService.getUserByName(name);

  if (result.length) {
    //const error = new Error();
    ctx.body = '用户名已经存在';
    return;
  }
  await next();
};

module.exports = {
  verifyuser,
};
