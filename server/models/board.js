const db = require('../db');

module.exports = {
  createPost: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `INSERT INTO board (title, content, user_id) VALUES ('${data.title}', '${data.content}', '${data.id}')`
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
            `SELECT board.id, board.title, user.user_id, board.content, board.created_at FROM board 
            INNER JOIN user ON board.user_id=user.id
            WHERE board.id=${data.id}`
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
  getPostList: function (data) {
    const query =
      !data.search || data.search === ''
        ? ''
        : `WHERE board.title LIKE '%${data.search}%' `;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `SELECT board.id, user.user_id, board.title, board.created_at FROM board 
            LEFT JOIN user ON board.user_id=user.id ${query}ORDER BY id 
            DESC LIMIT ${data.start},${data.pageSize}`
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
  getPostsCount: function (data) {
    const query =
      !data.search || data.search === ''
        ? ''
        : `WHERE board.title LIKE '%${data.search}%'`;
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`SELECT COUNT(*) FROM board ${query}`)
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
  insertImages: function (data) {
    const { images, boardId } = data;
    const query = images
      .map((image, i) => {
        return `('${image.name}', '${image.url}', ${boardId})`;
      })
      .join(',');

    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`INSERT INTO images (name, url, board_id) VALUES ${query}`)
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
  getImagesUrlAndName: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`SELECT name, url FROM images WHERE board_id=${data.boardId}`)
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
  getImages: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`SELECT * FROM images WHERE board_id=${data.boardId}`)
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
  deleteImages: function (data) {
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`DELETE FROM images WHERE board_id=${data.boardId}`)
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
  deleteImagesById: function (data) {
    const query = data.images
      .map(
        (image, i) =>
          `(${image.id}, '${image.name}')${
            data.images.length - 1 === i ? '' : ','
          }`
      )
      .join('');
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`DELETE FROM images WHERE (id, name) IN (${query})`)
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
