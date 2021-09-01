const jwt = require('jsonwebtoken');

module.exports = {
  verifyJwt: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const accessToken = authorization.split(' ')[1];
        if (accessToken) {
          const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
          req.decoded = decoded;
          next();
          return;
        }
        res.status(401).send('인증 오류');
        return;
      }
      res.status(401).send('인증 오류');
    } catch (error) {
      console.log(error);
      res.status(401).send('유효하지 않은 토큰');
    }
  },
};
