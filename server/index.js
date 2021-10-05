const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('./config/winston');

const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');
const paymentRouter = require('./routes/payment');

const PORT = 8080;
const app = express();
const morganFormat =
  'HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms';

dotenv.config();

const clientURL =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_CLIENT_URL
    : process.env.LOCAL_CLIENT_URL;

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(morganFormat, { stream: logger.stream }));
app.use(
  cors({
    origin: clientURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use('/', userRouter);
app.use('/', boardRouter);
app.use('/', paymentRouter);

app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT}`);
});
