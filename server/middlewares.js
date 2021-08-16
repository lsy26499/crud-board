const jwt = require('jsonwebtoken');

export const verifyJwt = async (req, res, next) => {
  const { authorization } = req.header;
};
