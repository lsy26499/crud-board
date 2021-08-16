const db = require('./db');

module.exports = {
  users: {
    get: function (body) {
      return new Promise((res, rej) => {
        db.getConnection()
          .then((conn) => {
            conn
              .query(`SELECT * FROM test WHERE email = '${body.email}'`)
              .then((rows) => {
                res(rows);
              });
            conn.release();
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    post: function (body) {
      return new Promise((res, rej) => {
        db.getConnection()
          .then((conn) => {
            conn
              .query(
                `INSERT INTO test(name, email, password) VALUES ('${body.name}', '${body.email}', '${body.password}')`
              )
              .then((rows) => {
                res(rows);
              });
            conn.release();
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
  },
};
