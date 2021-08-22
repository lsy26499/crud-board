const db = require('../db');

module.exports = {
  findByEmail: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`SELECT * FROM user WHERE email = '${data.email}'`)
          .then((rows) => {
            res(rows);
          })
          .catch((err) => {
            rej(err);
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
          .query(`SELECT * FROM user WHERE userId = '${data.userId}'`)
          .then((rows) => {
            res(rows);
          })
          .catch((err) => {
            rej(err);
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
          .query(`SELECT userId FROM user WHERE email = '${data.email}'`)
          .then((rows) => {
            res(rows);
          })
          .catch((err) => {
            rej(err);
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
          .query(`SELECT password FROM user WHERE id = '${data.id}'`)
          .then((rows) => {
            res(rows);
          })
          .catch((err) => {
            rej(err);
          });
      }).catch((err) => {
        rej(err);
      });
    });
  },
  updatePassword: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `UPDATE user SET password='${data.password}' WHERE id='${data.id}';`
          )
          .then((rows) => {
            res(rows);
          })
          .catch((err) => {
            rej(err);
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
            `INSERT INTO user(userId, email, password) VALUES ('${data.userId}', '${data.email}', '${data.password}')`
          )
          .then((rows) => {
            res(rows);
          })
          .catch((err) => {
            rej(err);
          });
      }).catch((err) => {
        rej(err);
      });
    });
  },
};
