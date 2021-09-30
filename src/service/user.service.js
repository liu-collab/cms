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
  //查找用户
  async detail(id) {
    try {
      const statement = ` SELECT * FROM users WHERE id = ?; `;
      const [result] = await connection.execute(statement, [id]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
  async list(offset, size) {
    try {
      const statement = `SELECT 
      u.id id ,u.name name ,u.createAt createAt , u.updateAt updateAt,u.realname realname ,
      u.cellphone cellphone ,u.departmentId  departmentId ,u.enable enable , u.roleId roleId
      FROM users u 
      LIMIT ? ,?;`;
      const [result] = await connection.execute(statement, [offset, size]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async listCount(offset, size) {
    try {
      const statement = `SELECT COUNT(1) count FROM users 	LIMIT ? ,?;`;
      const [count] = await connection.execute(statement, [offset, size]);
      return count[0].count;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();
