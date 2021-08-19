const mariadb = require('mariadb');

const connection = mariadb.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345678a!',
  database: 'test',
});

module.exports = connection;
