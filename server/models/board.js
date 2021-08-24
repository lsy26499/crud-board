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
  findFullPostDataById: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `SELECT board.id, board.title, user.userId, board.content, board.created_at FROM board INNER JOIN user ON board.author=user.id WHERE board.id='${data.id}'`
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
  updatePost: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `UPDATE board SET title='${data.title}', content='${data.content}' WHERE id=${data.id}`
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
  deletePost: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`DELETE FROM board WHERE id=${data.id}`)
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
  getPostList: function () {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `SELECT board.id, user.userId, board.title, board.created_at FROM board LEFT JOIN user ON board.author=user.id`
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
