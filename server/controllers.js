const models = require('./models');
const jwt = require('jsonwebtoken');

module.exports = {
  signIn: async (req, res) => {
    try {
      const { body } = req;
      const { email, password } = body;
      const user = await models.users.get({ email, password });
      if (user[0] && user[0].password === password) {
        const { email, name } = user[0];
        const accessToken = jwt.sign({ email, name }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        const tokenType = 'Bearer';
        res
          .status(200)
          .send({ message: '로그인 성공', accessToken, tokenType });
      } else {
        res.status(401).send('이메일 또는 비밀번호가 잘못되었습니다');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  signUp: async (req, res) => {
    try {
      const { body } = req;
      const { name, email, password } = body;
      await models.users.post({ name, email, password });
      res.status(200).send('회원가입 성공');
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 에러');
    }
  },
  checkIsEmailExist: async (req, res) => {
    try {
      const { body } = req;
      const { email } = body;
      const user = await models.users.get({ email });
      if (user[0]) {
        res.status(200).send('사용 가능한 이메일');
      } else {
        res.status(401).send('이미 존재하는 이메일');
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
