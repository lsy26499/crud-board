module.exports = {
  signIn: async (req, res) => {
    try {
      res.status(200).send('로그인');
    } catch (error) {
      // 비번 or 이메일 잘못입력 (401)
      console.log(error);
    }
  },
  signUp: async (req, res) => {
    try {
      res.status(200).send('가입');
    } catch (error) {
      // 이미 가입된 이메일
      console.log(error);
    }
  },
};
