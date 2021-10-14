const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const utils = require('../utils');
const logger = require('../config/winston');

module.exports = {
  signIn: async (req, res) => {
    try {
      const { body } = req;
      const { userId, password } = body;
      const [user] = await models.user.findByUserId({ userId });
      const matchPassword = await bcrypt.compare(password, user.password);
      if (user && matchPassword) {
        const { id, email, user_id } = user;
        const accessToken = jwt.sign(
          { email, userId: user_id },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );
        const tokenType = 'Bearer';
        res.status(200).send({
          message: '로그인 성공',
          accessToken,
          tokenType,
          cid: process.env.IAMPORT_CID,
          user: { id, email, userId },
        });
        return;
      } else {
        logger.warn('bad request');
        res.status(400).send('아이디 또는 비밀번호가 잘못되었습니다');
        return;
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
  signUp: async (req, res) => {
    try {
      const { body } = req;
      const { userId, email, password } = body;
      if (!utils.validateEmail(email)) {
        logger.warn('bad request');
        res.status(400).send('잘못된 이메일');
        return;
      }
      if (userId.trim() === '' || password.trim() === '') {
        logger.warn('bad request');
        res.status(400).send('빈 아이디 또는 패스워드');
        return;
      }

      const [userFoundById] = await models.user.findByUserId({ userId });
      const [userFoundByEmail] = await models.user.findByEmail({ email });
      if (userFoundById) {
        logger.warn('bad request');
        res.status(400).send('이미 가입된 유저');
        return;
      }
      if (userFoundByEmail) {
        logger.warn('bad request');
        res.status(400).send('중복된 이메일');
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      await models.user.insert({ userId, email, password: hashed });
      logger.info('success');
      res.status(201).send('회원가입 성공');
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
  findId: async (req, res) => {
    try {
      const { query } = req;
      const { email } = query;
      const [userId] = await models.user.findUserId({ email });
      if (userId) {
        logger.info('success');
        res.status(200).send({ foundData: userId.userId });
        return;
      } else {
        logger.info('user not found');
        res.status(404).send('존재하지 않는 유저');
        return;
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
  findUserById: async (req, res) => {
    try {
      const { query } = req;
      const { userId, email } = query;
      const [user] = await models.user.findByUserId({ userId });
      if (user && user?.email === email) {
        logger.info('success');
        res.status(200).send({ user: { id: user.id, userId: user.userId } });
        return;
      } else {
        logger.info('user not found');
        res.status(404).send('존재하지 않는 유저');
        return;
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { body } = req;
      const { id, newPassword } = body;
      const [{ password: oldPassword }] = await models.user.findPassword({
        id,
      });
      const matchPassword = await bcrypt.compare(newPassword, oldPassword);
      if (!matchPassword) {
        const password = await bcrypt.hash(newPassword, 10);
        await models.user.updatePassword({ id, password });
        logger.info('success');
        res.status(201).send('비밀번호 재설정 성공');
        return;
      } else {
        logger.info('bad request');
        res.status(400).send('입력한 비밀번호가 이전 비밀번호와 동일함');
        return;
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).send('서버 에러');
    }
  },
};
