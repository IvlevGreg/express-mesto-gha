const { AuthError } = require('./AuthError');
const { NotFoundError } = require('./NotFoundError');
const { ValidationError } = require('./ValidationError');
const { Default400Error } = require('./Default400Error');
const { UserExist } = require('./UserExist');

module.exports = {
  AuthError,
  NotFoundError,
  ValidationError,
  Default400Error,
  UserExist,
};
