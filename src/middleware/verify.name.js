const VerifyName = require('../service/verify.name');
const errType = require('../constans/errType');
const verifyNameRepeat = (tablename) => async (ctx, next) => {
  const { name } = ctx.request.body;

  try {
    const result = await VerifyName.verify(tablename, name);
    if (result) {
      //判断是否为修改表信息
      //没有修改name的情况下,其他数据修改也是可以的

      if (ctx.params.id) {
        if (parseInt(ctx.params.id) !== result.id) {
          const error = new Error(errType.USER_NAME_IS_EXISTS);
          return ctx.app.emit('error', error, ctx);
        }
      } else if (!ctx.params.id) {
        //判断是否为创建用户,用户名不能重复

        const error = new Error(errType.NAME_EXISTS);
        return ctx.app.emit('error', error, ctx);
      }
    }
    await next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  verifyNameRepeat,
};
