const models = require('../models');
const logger = require('../config/winston');
const {
  LOCAL_CLIENT_URL,
  PROD_CLIENT_URL,
  KAKAO_APP_ADMIN_KEY,
  KAKAO_PAY_CID,
} = process.env;

const redirectBaseUrl =
  process.env.NODE_ENV === 'production' ? PROD_CLIENT_URL : LOCAL_CLIENT_URL;

module.exports = {
  readyToKakaoPayment: function async(req, res) {},
};
