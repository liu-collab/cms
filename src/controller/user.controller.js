const userService = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    const code = 0;
    const message = '添加用户成功';
    try {
      //1.获取用户信息
      const user = ctx.request.body;

      //2.创建用户
      const result = await userService.create(user);
      const { affectedRows } = result;
      if (affectedRows) {
        ctx.body = {
          code,
          message,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new UserController();
