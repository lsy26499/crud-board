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
paymentRouter.post(
  '/payment/iamport/ready',
  verifyJwt,
  controllers.payment.readyToIamportPayment
);
paymentRouter.post(
  '/payment/iamport/approve',
  verifyJwt,
  controllers.payment.approveImaportPayment
);
paymentRouter.post(
  '/payment/iamport/failure',
  verifyJwt,
  controllers.payment.failImaportPayment
);

module.exports = paymentRouter;
