const userService = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    try {
      //1.获取用户信息
      const user = ctx.request.body;

      //2.创建用户
      const result = await userService.create(user);

      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new UserController();
