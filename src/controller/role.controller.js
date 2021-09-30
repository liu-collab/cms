const RoleService = require('../service/role.service');

class RoleController {
  async create(ctx, next) {
    const code = 0;
    const message = '创建角色成功';
    try {
      const role = ctx.request.body;
      const result = await RoleService.create(role);
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
  async change(ctx, next) {
    const code = 0;
    const message = '修改角色成功';
    const { id } = ctx.params;
    const role = ctx.request.body;
    try {
      const result = await RoleService.change(id, role);
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

module.exports = new RoleController();
