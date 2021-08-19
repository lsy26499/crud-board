const models = require('./models');
const jwt = require('jsonwebtoken');

module.exports = {
  signIn: async (req, res) => {
    try {
      const { body } = req;
      const { userId, password } = body;
      const user = await models.users.findByUserId({ userId });
      if (user[0] && user[0].password === password) {
        const { email, userId } = user[0];
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
        res.status(400).send('이메일 또는 비밀번호가 잘못되었습니다');
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
      const userFoundById = await models.users.findByUserId({ userId });
      const userFoundByEmail = await models.users.findByEmail({ email });
      if (userFoundById[0]) {
        res.status(400).send('이미 가입된 유저');
        return;
      }
      if (userFoundByEmail[0]) {
        res.status(400).send('중복된 이메일');
        return;
      }
      await models.users.insert({ userId, email, password });
      res.status(200).send('회원가입 성공');
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  checkIsIdExist: async (req, res) => {
    try {
      const { query } = req;
      const { userId } = query;
      const user = await models.users.findByEmail({ userId });
      if (!user[0]) {
        res
          .status(200)
          .send({ message: '사용 가능한 아이디', isEmailExist: false });
      } else {
        res
          .status(200)
          .send({ message: '이미 존재하는 아이디', isEmailExist: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  checkIsEmailExist: async (req, res) => {
    try {
      const { query } = req;
      const { email } = query;
      const user = await models.users.findByEmail({ email });
      if (!user[0]) {
        res
          .status(200)
          .send({ message: '사용 가능한 이메일', isEmailExist: false });
      } else {
        res
          .status(200)
          .send({ message: '이미 존재하는 이메일', isEmailExist: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  signOut: async () => {
    // 토큰 파괴
  },
};
