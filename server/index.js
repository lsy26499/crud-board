const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');

const PORT = 8080;
const app = express();

dotenv.config();

app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '150mb', extended: true }));
app.use(morgan('dev'));
app.use(
  cors({
    // origin: 'http://crud-project-test.s3-website.ap-northeast-2.amazonaws.com',
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use('/', userRouter);
app.use('/', boardRouter);

app.listen(PORT, () => {
  console.log(`✅ Listening on http://localhost:${PORT}`);
});
