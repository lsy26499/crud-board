const db = require('./db');

module.exports = {
  users: {
    get: async (data) => {
      const { email } = data;
      try {
        const pool = await db.getConnection();
        const users = await pool.query(
          `SELECT * FROM test WHERE email = '${email}'`
        );
        return users;
      } catch (error) {
        console.log(error);
      }
    },
    post: async (data) => {
      const { email, password } = data;
      try {
        const pool = await db.getConnection();
        await pool.query(
          `INSERT INTO test(email, password) VALUES ('${email}', '${password}')`
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
