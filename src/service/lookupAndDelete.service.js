const connection = require('../app/database');

class LookupAndDeleteService {
  async list(offset, size, tablename) {
    try {
      const statement = `SELECT * FROM ${tablename} LIMIT ?,?;`;
      const [result] = await connection.execute(statement, [offset, size]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async remove(id, tablename) {
    try {
      const statement = `DELETE  FROM ${tablename} WHERE id=?;`;
      const result = await connection.execute(statement, [id]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
  async detail(id, tablename) {
    try {
      const statement = `SELECT * FROM ${tablename} WHERE id=?;`;
      const [result] = await connection.execute(statement, [id]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
  async listCount(offset, size, tablename) {
    try {
      const statement = `SELECT COUNT(1) count FROM ${tablename} 	LIMIT ? ,?;`;
      const [count] = await connection.execute(statement, [offset, size]);
      return count[0].count;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LookupAndDeleteService();
