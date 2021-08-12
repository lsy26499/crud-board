const models = require('./models');

module.exports = {
  signIn: async (req, res) => {
    try {
      const email = 'test@test.com';
      // req.body에서 이메일, 패스워드 꺼냄
      // 이메일로 유저 찾기
      // 비밀번호가 찾은 비밀번호와 다르다면 에러 (400)
      // 유저 없어도 에러 (404)
      // 200일 경우 jwt 토큰 발급
      const users = await models.users.get(email);
      console.log(users);
      res.status(200).send('로그인');
    } catch (error) {
      console.log(error);
    }
  },
  signUp: async (req, res) => {
    try {
      const [email, password] = ['1@1.com', '1234'];
      // 이미 가입된 이메일
      await models.users.post({ email, password });
      res.status(200).send('가입');
    } catch (error) {
      console.log(error);
    }
  },
  signOut: async () => {
    // 토큰 파괴
  },
};
