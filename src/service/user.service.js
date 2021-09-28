const connection = require('../app/database');

class UserService {
  async create(user) {
    try {
      const { name, password } = user;
      console.log(name, password);
      const statement = `INSERT INTO users (name,password) VALUES (?,?);`;
      const result = await connection.execute(statement, [name, password]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();
