const md5password = require('../utils/passwordhandle');

const passwordhandle = async (ctx, next) => {
  const { password } = ctx.request.body;

  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = passwordhandle;
