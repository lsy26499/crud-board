const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345678a!',
  database: 'test',
  connectionLimit: 5,
});

module.exports = pool;
