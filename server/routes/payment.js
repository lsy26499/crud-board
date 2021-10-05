const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const { verifyJwt } = middlewares;

const paymentRouter = express.Router();

paymentRouter.post(
  '/payment/kakao/ready',
  verifyJwt,
  controllers.payment.readyToKakaoPayment
);
paymentRouter.post(
  '/payment/kakao/approve',
  verifyJwt,
  controllers.payment.approveKakaoPayment
);

module.exports = paymentRouter;
