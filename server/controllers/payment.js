const models = require('../models');
const logger = require('../config/winston');
const axios = require('axios');
const randomstring = require('randomstring');

const generateOrderNumber = () => {
  return `${Date.now()}-${randomstring.generate({
    length: 12,
    charset: 'hex',
  })}`;
};

module.exports = {
  readyToKakaoPayment: async (req, res) => {
    const {
      LOCAL_CLIENT_URL,
      PROD_CLIENT_URL,
      KAKAO_APP_ADMIN_KEY,
      KAKAO_PAY_CID,
    } = process.env;

    const redirectBaseUrl =
      process.env.NODE_ENV === 'production'
        ? PROD_CLIENT_URL
        : LOCAL_CLIENT_URL;

    try {
      const { decoded, query } = req;
      const { userId } = decoded;
      const { productId, quantity = 1 } = query;

      const [user] = await models.user.findByUserId({ userId });
      if (!user) {
        logger.warn('user not found');
        res.status(404).send('존재하지 않는 유저');
        return;
      }

      const [product] = await models.product.findProductById({ productId });
      if (!product) {
        logger.warn('user not found');
        res.status(404).send('존재하지 않는 유저');
        return;
      }

      const orderNumber = generateOrderNumber();
      // const order = await models.order.createOrder({
      //   orderNumber,
      //   productId,
      //   quantity,
      //   userId: user.id,
      // });

      const params = {
        cid: KAKAO_PAY_CID,
        partner_order_id: orderNumber,
        partner_user_id: user.id,
        item_name: product.name,
        item_code: product.id,
        quantity,
        total_amount: quantity * product.price,
        tax_free_amount: 0,
        approval_url: `${redirectBaseUrl}/payment/kakao/approval?partner_order_id=${orderNumber}&partner_user_id=${user.id}`,
        cancel_url: `${redirectBaseUrl}/payment/kakao/cancel`,
        fail_url: `${redirectBaseUrl}/payment/kakao/fail`,
      };

      const { data } = await axios.post(
        'https://kapi.kakao.com/v1/payment/ready',
        {},
        {
          params,
          headers: {
            Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      const { tid, next_redirect_pc_url } = data;
      console.log(tid);
      // await models.order.updateKakaoReadyTid({ tid, orderId: order.insertId });

      logger.info('success');
      res.status(200).send({
        nextRedirectURL: next_redirect_pc_url,
        tid,
      });
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
  approveKakaoPayment: async (req, res) => {
    try {
      const { decoded, body } = req;
      const { userId } = decoded;
      const { pg_token, partner_order_id, tid } = body;
      const { KAKAO_APP_ADMIN_KEY, KAKAO_PAY_CID } = process.env;

      const [user] = await models.user.findByUserId({ userId });
      if (!user) {
        logger.warn('user not found');
        res.status(404).send('존재하지 않는 유저');
        return;
      }

      const params = {
        cid: KAKAO_PAY_CID,
        tid,
        partner_order_id,
        partner_user_id: user.id,
        pg_token,
      };
      const { data } = await axios.post(
        'https://kapi.kakao.com/v1/payment/approve',
        {},
        {
          params,
          headers: {
            Authorization: `KakaoAK ${KAKAO_APP_ADMIN_KEY}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      const {
        tid: resultTid,
        partner_order_id: orderNumber,
        item_code: productId,
        quantity,
      } = data;
      const paymentType = 'KAKAOPAY';
      await models.order.createOrder({
        userId: user.id,
        tid: resultTid,
        orderNumber,
        productId,
        quantity,
        paymentType,
      });

      logger.info('success');
      res.status(200).send('성공');
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
};
