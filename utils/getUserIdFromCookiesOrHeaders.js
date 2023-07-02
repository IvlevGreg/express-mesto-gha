const jwt = require('jsonwebtoken');

const {
  AuthError,
} = require('./Errors/AuthError');

const getUserIdFromCookiesOrHeaders = (req) => {
  const tokenCoookie = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!tokenCoookie && !(authorization && authorization.startsWith('Bearer '))) {
    throw new AuthError();
  }

  const token = tokenCoookie || authorization.replace('Bearer ', '');

  try {
    return jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new AuthError();
  }
};

module.exports = { getUserIdFromCookiesOrHeaders };
