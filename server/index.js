const express = require('express');
const router = require('./routes');
const cors = require('cors');

const PORT = 8080;
const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use('/', router);

app.listen(PORT, () => {
  console.log(`✅ Listening on http://localhost:${PORT}`);
});
