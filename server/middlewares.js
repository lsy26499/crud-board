const jwt = require('jsonwebtoken');

//! jwt 검증 미들웨어 작성 필요
export const verifyJwt = async (req, res, next) => {
  const { authorization } = req.header;
};
