const db = require('../db');

module.exports = {
  createHashtags: function (data) {
    const { hashtag } = data;
    const query = hashtag.map((tag) => `('${tag}')`).join(',');
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`INSERT INTO hashtag (name) VALUES ${query}`)
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
  findHashtags: function (data) {
    const { hashtag } = data;
    const query = hashtag.map((tag) => `'${tag}'`).join(',');
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`SELECT * FROM hashtag WHERE name IN (${query})`)
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
  findBoardHashtags: function (data) {
    const { boardIds } = data;
    const query = boardIds.map((id) => `${id}`).join(',');
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `SELECT board_hashtag.board_id, hashtag.id, hashtag.name FROM board_hashtag 
            LEFT JOIN hashtag ON board_hashtag.hashtag_id=hashtag.id 
            WHERE board_id IN (${query})`
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
  insertBoardAndHashtag: function (data) {
    const { boardId, hashtagIds } = data;
    const query = hashtagIds
      .map((hashtagId) => `(${hashtagId}, ${boardId})`)
      .join(',');
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(
            `INSERT INTO board_hashtag (hashtag_id, board_id) VALUES ${query}`
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
  deleteBoardHashtag: function (data) {
    const { hashtagIds } = data;
    const query = hashtagIds.map((hashtagId) => `(${hashtagId})`).join(',');
    return new Promise((res, rej) => {
      db.then((conn) => {
        conn
          .query(`DELETE FROM board_hashtag WHERE (hashtag_id) IN (${query})`)
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
