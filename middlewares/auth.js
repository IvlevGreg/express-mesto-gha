const {
  getVerifyDataFromToken,
} = require('../utils/getVerifyDataFromToken');

module.exports = (req, res, next) => {
  const token = getVerifyDataFromToken(req);
  req.user = token;

  next();
};
