const connection = require('../app/database');

class VerifyName {
  async verify(tablename, name) {
    try {
      const statement = `SELECT * FROM ${tablename} WHERE name = ?;`;
      const [result] = await connection.execute(statement, [name]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new VerifyName();
