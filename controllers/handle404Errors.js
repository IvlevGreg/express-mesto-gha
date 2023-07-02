const {
  NotFoundError,
} = require('../utils/Errors');

const handle404Errors = (_, __, next) => {
  next(new NotFoundError('Такой страницы не существует'));
};

module.exports = { handle404Errors };
