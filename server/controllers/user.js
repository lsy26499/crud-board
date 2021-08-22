const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  signIn: async (req, res) => {
    try {
      const { body } = req;
      const { userId, password } = body;
      const [user] = await models.user.findByUserId({ userId });
      const matchPassword = await bcrypt.compare(password, user.password);
      if (user && matchPassword) {
        const { email, userId } = user;
        const accessToken = jwt.sign(
          { email, userId },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );
        const tokenType = 'Bearer';
        res
          .status(200)
          .send({ message: '로그인 성공', accessToken, tokenType });
      } else {
        res.status(400).send('아이디 또는 비밀번호가 잘못되었습니다');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  signUp: async (req, res) => {
    try {
      const { body } = req;
      const { userId, email, password } = body;
      const [userFoundById] = await models.user.findByUserId({ userId });
      const [userFoundByEmail] = await models.user.findByEmail({ email });
      if (userFoundById) {
        res.status(400).send('이미 가입된 유저');
        return;
      }
      if (userFoundByEmail) {
        res.status(400).send('중복된 이메일');
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      await models.user.insert({ userId, email, password: hashed });
      res.status(201).send('회원가입 성공');
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  findId: async (req, res) => {
    try {
      const { query } = req;
      const { email } = query;
      const [userId] = await models.user.findUserId({ email });
      if (userId) {
        res.status(200).send({ foundData: userId.userId });
      } else {
        res.status(404).send('존재하지 않는 유저');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  findUserById: async (req, res) => {
    try {
      const { query } = req;
      const { userId } = query;
      const [user] = await models.user.findByUserId({ userId });
      if (user) {
        res.status(200).send({ user: { id: user.id, userId: user.userId } });
      } else {
        res.status(404).send('존재하지 않는 유저');
      }
    } catch (error) {
      console.log(error);
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
        res.status(201).send('비밀번호 재설정 성공');
      } else {
        res.status(200).send('입력한 비밀번호가 이전 비밀번호와 동일함');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
};
