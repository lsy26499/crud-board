const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('./config/winston');

const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');

const PORT = 8080;
const app = express();
const morganFormat =
  'HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms';

dotenv.config();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(morganFormat, { stream: logger.stream }));
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
  logger.info(`server listening on port ${PORT}`);
});
