const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config');
class LoginController {
  async login(ctx, next) {
    //console.log(ctx.request.body);
    const code = 0;
    const message = '登录成功';

    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256',
    });
    const data = {
      id,
      name,
      token,
    };
    ctx.body = {
      code,
      message,
      data,
    };
  }
}

module.exports = new LoginController();
