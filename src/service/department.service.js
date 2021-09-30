const connection = require('../app/database');

class DepartmentService {
  async create(department) {
    try {
      const { name, parentId = null, leader = null } = department;
      const statement = `INSERT INTO department (name,parentId ,leader) VALUES (?,?,?);`;
      const result = await connection.execute(statement, [
        name,
        parentId,
        leader,
      ]);

      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new DepartmentService();
