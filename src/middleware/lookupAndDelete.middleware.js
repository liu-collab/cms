const LookupAndDeleteService = require('../service/lookupAndDelete.service');

const list = (tablename) => async (ctx, next) => {
  const code = 0;
  const list = [];
  try {
    const { offset, size } = ctx.query;
    const result = await LookupAndDeleteService.list(offset, size, tablename);
    const totalCount = await LookupAndDeleteService.listCount(
      offset,
      size,
      tablename
    );
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
