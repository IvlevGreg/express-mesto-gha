const { handle404Error } = require('../utils/handleErrors');

const handle404Errors = (req, res) => {
  handle404Error({ message: 'Такой страницы не существует' }, res);
};

module.exports = { handle404Errors };
