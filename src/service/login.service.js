const connection = require('../app/database');

class LoginService {
  async getNameById(name) {
    try {
      const statement = `SELECT * FROM users WHERE name = ?;`;
      const result = await connection.execute(statement, [name]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new LoginService();
