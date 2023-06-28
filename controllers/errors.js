const {
  NotFoundError,
} = require('../utils/Errors');

const handle404Errors = () => {
  throw new NotFoundError('Такой страницы не существует');
};

module.exports = { handle404Errors };
