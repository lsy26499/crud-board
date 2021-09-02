const db = require('../db');

module.exports = {
  createPost: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `INSERT INTO board (title, summary, content, userId) VALUES ('${data.title}', '${data.summary}', '${data.content}', '${data.id}')`
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
            `SELECT board.id, board.title, user.userId, board.content, board.summary, board.createdAt FROM board INNER JOIN user ON board.userId=user.id WHERE board.id='${data.id}'`
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
            `UPDATE board SET title='${data.title}', content='${data.content}', summary='${data.summary}' WHERE id=${data.id}`
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
            `SELECT board.id, user.userId, board.title, board.summary, board.createdAt FROM board LEFT JOIN user ON board.userId=user.id ORDER BY id DESC`
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
