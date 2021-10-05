const db = require('../db');

module.exports = {
  findProductById: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`SELECT * FROM product WHERE id = '${data.productId}'`)
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
