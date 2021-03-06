const db = require('../db');

module.exports = {
  createOrder: function (data) {
    const { orderNumber, productId, quantity, userId, paymentType, tid } = data;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `INSERT INTO orders (order_number, product_id, quantity, payment_type, user_id${
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
  findOrderByOrderNumber: function (data) {
    const { orderNumber } = data;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`SELECT * FROM orders WHERE order_number='${orderNumber}'`)
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
  updateIamportOrder: function (data) {
    const { id, imp_uid } = data;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`UPDATE orders SET imp_uid='${imp_uid}' WHERE id=${id}`)
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
  deleteIamportOrder: function (data) {
    const { orderNumber } = data;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`DELETE FROM orders WHERE order_number='${orderNumber}'`)
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
