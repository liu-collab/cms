const connection = require('../app/database');

class UserService {
  async create(user) {
    try {
      const {
        name,
        password,
        realname = null,
        cellphone = null,
        departmentId = null,
        roleId = null,
      } = user;

      const statement = `INSERT INTO users (name,password ,realname,cellphone , departmentId ,roleId) VALUES (?,?,?,?,?,?);`;
      const result = await connection.execute(statement, [
        name,
        password,
        realname,
        cellphone,
        departmentId,
        roleId,
      ]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
  async getUserByName(name) {
    try {
      const statement = `SELECT * FROM users WHERE name = ?;`;

      const result = await connection.execute(statement, [name]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();
