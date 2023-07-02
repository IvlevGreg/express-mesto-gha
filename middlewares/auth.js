const {
  getUserIdFromCookiesOrHeaders,
} = require('../utils/getUserIdFromCookiesOrHeaders');

module.exports = (req, res, next) => {
  const token = getUserIdFromCookiesOrHeaders(req);
  req.user = token;

  next();
};
