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
    findByName: function (body) {
      return new Promise((res, rej) => {
        db.getConnection()
          .then((conn) => {
            conn
              .query(`SELECT * FROM test WHERE name = '${body.name}'`)
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
