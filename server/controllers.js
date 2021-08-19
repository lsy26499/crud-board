const models = require('./models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  signIn: async (req, res) => {
    try {
      const { body } = req;
      const { userId, password } = body;
      const [user] = await models.users.findByUserId({ userId });
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
      const [userFoundById] = await models.users.findByUserId({ userId });
      const [userFoundByEmail] = await models.users.findByEmail({ email });
      if (userFoundById) {
        res.status(400).send('이미 가입된 유저');
        return;
      }
      if (userFoundByEmai) {
        res.status(400).send('중복된 이메일');
        return;
      }
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(500).send('서버 에러');
        }
        await models.users.insert({ userId, email, password: hash });
        res.status(200).send('회원가입 성공');
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  checkIsIdExist: async (req, res) => {
    try {
      const { query } = req;
      const { userId } = query;
      const [user] = await models.users.findByEmail({ userId });
      if (!user) {
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
      const [user] = await models.users.findByEmail({ email });
      if (!user) {
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
};
