const db = require('../db');

module.exports = {
  createOrder: function (data) {
    const { orderNumber, productId, quantity, userId } = data;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `INSERT INTO orders (orderNumber, productId, quantity, userId) VALUES ('${orderNumber}', ${productId}, ${quantity}, ${userId})`
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
  updateKakaoReadyTid: function (data) {
    const { orderId, tid } = data;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`UPDATE orders SET tid='${tid}' WHERE id=${orderId}`)
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
