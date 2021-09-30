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
  async deleteUserById(id) {
    try {
      const statement = `DELETE  FROM users WHERE id=?;`;
      const result = await connection.execute(statement, [id]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
  async changeUserById(id, user) {
    const { name, realname, cellphone, departmentId, roleId } = user;

    const statement = `UPDATE users SET 
    name = ?,realname=?,
    cellphone=?,departmentId=?,roleId=? WHERE id = ?`;
    try {
      const result = await connection.execute(statement, [
        name,
        realname,
        cellphone,
        departmentId,
        roleId,
        id,
      ]);
      console.log(result);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();
