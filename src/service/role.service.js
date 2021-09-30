const connection = require('../app/database');

class RoleService {
  async create(role) {
    const { name, intro = null } = role;
    const statement = `INSERT INTO role (name,intro) VALUES (?,?);`;
    const result = await connection.execute(statement, [name, intro]);
    return result[0];
  }
  async change(id, role) {
    try {
      const { name, intro = null } = role;
      const statement = `UPDATE role SET 
      name = ?,intro=?
      WHERE id = ?`;
      const result = await connection.execute(statement, [name, intro, id]);
      return result[0];
    } catch (error) {}
  }
}

module.exports = new RoleService();
