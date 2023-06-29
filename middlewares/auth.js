const jwt = require('jsonwebtoken');

const {
  AuthError,
} = require('../utils/Errors/AuthError');

module.exports = (req, res, next) => {
  const tokenCoookie = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!tokenCoookie && !(authorization && authorization.startsWith('Bearer '))) {
    throw new AuthError();
  }

  const token = tokenCoookie || authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new AuthError();
  }

  req.user = payload;

  next();
};
