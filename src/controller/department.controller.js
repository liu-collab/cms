const DepartmentService = require('../service/department.service');
const errType = require('../constans/errType');
class DepartmentController {
  async create(ctx, next) {
    const code = 0;
    const message = '创建部门成功';
    //1.获取信息
    const { name } = ctx.request.body;
    if (!name) {
      const error = new Error(errType.DEPARTMENT_NAME_NOT_NULL);
      return ctx.app.emit('error', error, ctx);
    }
    const department = ctx.request.body;

    const result = await DepartmentService.create(department);

    const { affectedRows } = result;

    if (affectedRows) {
      ctx.body = {
        code,
        message,
      };
    }
  }
}

module.exports = new DepartmentController();
