const LookupAndDeleteService = require('../service/lookupAndDelete.service');
const UserService = require('../service/user.service');
//查询列表
const list = (tablename) => async (ctx, next) => {
  const code = 0;
  const list = [];
  const { offset, size } = ctx.query;
  try {
    const totalCount = await LookupAndDeleteService.listCount(
      offset,
      size,
      tablename
    );
    switch (tablename) {
      case 'users':
        result = await UserService.list(offset, size);
        break;
      default:
        result = await LookupAndDeleteService.list(offset, size, tablename);
        break;
    }

    list.push(...result);
    const data = {
      list,
      totalCount,
    };
    ctx.body = {
      code,
      data,
    };
  } catch (error) {
    console.log(error);
  }
};
//删除
const remove = (tablename) => async (ctx, next) => {
  const code = 0;
  const message = '删除成功';
  const { id } = ctx.params;
  const result = await LookupAndDeleteService.remove(id, tablename);
  const { affectedRows } = result;
  if (affectedRows) {
    ctx.body = {
      code,
      message,
    };
  }
};
//查询单个
const detail = (tablename) => async (ctx, next) => {
  const code = 0;
  try {
    const { id } = ctx.params;
    const result = await LookupAndDeleteService.detail(id, tablename);

    const data = {
      ...result,
    };
    ctx.body = {
      code,
      data,
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  list,
  remove,
  detail,
};
