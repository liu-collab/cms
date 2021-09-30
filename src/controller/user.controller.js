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
  //删除用户
  async remove(ctx, next) {
    const code = 0;
    const message = '删除用户成功';
    const { id } = ctx.params;
    const result = await userService.deleteUserById(id);
    const { affectedRows } = result;
    if (affectedRows) {
      ctx.body = {
        code,
        message,
      };
    }
  }
  //修改用户
  async change(ctx, next) {
    const code = 0;
    const message = '修改用户成功';
    const { id } = ctx.params;
    const user = ctx.request.body;

    const result = await userService.changeUserById(id, user);

    const { affectedRows } = result;
    if (affectedRows) {
      ctx.body = {
        code,
        message,
      };
    }
  }
  //查找单个用户
  async detail(ctx, next) {
    const code = 0;

    const { id } = ctx.params;
    const result = await userService.detail(id);
    const data = {
      ...result,
    };
    ctx.body = {
      code,
      data,
    };
  }
  //查找用户列表
  async list(ctx, next) {
    const code = 400;
    const list = [];

    const { offset, size } = ctx.query;

    const result = await userService.list(offset, size);
    const totalCount = await userService.listCount(offset, size);
    list.push(...result);

    const data = {
      list,
      totalCount,
    };
    ctx.body = {
      code,
      data,
    };
  }
}
module.exports = new UserController();
