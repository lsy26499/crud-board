const db = require('./db');

module.exports = {
  users: {
    findByEmail: function (body) {
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
    findByUserId: function (body) {
      return new Promise((res, rej) => {
        db.getConnection()
          .then((conn) => {
            conn
              .query(`SELECT * FROM test WHERE userId = '${body.userId}'`)
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
    insert: function (body) {
      return new Promise((res, rej) => {
        db.getConnection()
          .then((conn) => {
            conn
              .query(
                `INSERT INTO test(userId, email, password) VALUES ('${body.userId}', '${body.email}', '${body.password}')`
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
