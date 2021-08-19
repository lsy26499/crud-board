const db = require('./db');

module.exports = {
  users: {
    findByEmail: function (data) {
      return new Promise((res, rej) => {
        db.then((conn) => {
          conn
            .query(`SELECT * FROM test WHERE email = '${data.email}'`)
            .then((rows) => {
              res(rows);
            });
        }).catch((err) => {
          rej(err);
        });
      });
    },
    findByUserId: function (data) {
      return new Promise((res, rej) => {
        db.then((conn) => {
          conn
            .query(`SELECT * FROM test WHERE userId = '${data.userId}'`)
            .then((rows) => {
              res(rows);
            });
        }).catch((err) => {
          rej(err);
        });
      });
    },
    findUserId: function (data) {
      return new Promise((res, rej) => {
        db.then((conn) => {
          conn
            .query(`SELECT userId FROM test WHERE email = '${data.email}'`)
            .then((rows) => {
              res(rows);
            });
        }).catch((err) => {
          rej(err);
        });
      });
    },
    findPassword: function (data) {
      return new Promise((res, rej) => {
        db.then((conn) => {
          conn
            .query(
              `SELECT password FROM test WHERE userId = '${data.userId}' AND email = '${data.email}'`
            )
            .then((rows) => {
              res(rows);
            });
        }).catch((err) => {
          rej(err);
        });
      });
    },
    insert: function (data) {
      return new Promise((res, rej) => {
        db.then((conn) => {
          conn
            .query(
              `INSERT INTO test(userId, email, password) VALUES ('${data.userId}', '${data.email}', '${data.password}')`
            )
            .then((rows) => {
              res(rows);
            });
        }).catch((err) => {
          rej(err);
        });
      });
    },
  },
};
