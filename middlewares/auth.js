const jwt = require('jsonwebtoken');
const {
  handle401Error,
} = require('../utils/handleErrors');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handle401Error(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handle401Error(res);
  }

  req.user = payload;

  next();
};
