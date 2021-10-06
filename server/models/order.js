const db = require('../db');

module.exports = {
  createOrder: function (data) {
    const { orderNumber, productId, quantity, userId, paymentType, tid } = data;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `INSERT INTO orders (orderNumber, productId, quantity, paymentType, userId${
              tid ? `, tid` : ''
            }) 
            VALUES ('${orderNumber}', ${productId}, ${quantity}, '${paymentType}', ${userId}${
              tid ? `, '${tid}'` : ''
            })`
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
  findOrderById: function (data) {
    const { orderId } = data;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`SELECT * FROM orders WHERE id=${orderId}`)
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
