const jwt = require('jsonwebtoken');

const {
  AuthError,
} = require('../utils/Errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError();
  }
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new AuthError();
  }

  req.user = payload;

  next();
};
