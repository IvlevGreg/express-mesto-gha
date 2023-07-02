const jwt = require('jsonwebtoken');

const {
  AuthError,
} = require('./Errors/AuthError');

const getUserIdFromCookiesOrHeaders = (req, next) => {
  const tokenCookie = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!tokenCookie && !(authorization && authorization.startsWith('Bearer '))) {
    next(new AuthError());
    return;
  }

  const token = tokenCookie || authorization.replace('Bearer ', '');

  try {
    return jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new AuthError());
  }
};

module.exports = { getUserIdFromCookiesOrHeaders };
