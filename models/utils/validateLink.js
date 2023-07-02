const { LINK_PATTERN } = require('../../utils/LINK_PATTERN');

const validateLink = {
  validator: (str) => LINK_PATTERN.test(str),
  message: 'Некореектный url',
};

module.exports = { validateLink };
