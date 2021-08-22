const db = require('../db');

module.exports = {
  createPost: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `INSERT INTO board (title, content, author) VALUES ('${data.title}', '${data.content}', '${data.id}')`
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
  findPostById: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`SELECT * from board WHERE id='${data.id}'`)
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
  updatePost: function (data) {},
  deletePost: function (data) {},
  getPostList: function (data) {},
};
