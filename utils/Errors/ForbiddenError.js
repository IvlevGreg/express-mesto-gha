const DEFAULT_403_ERROR_TEXT = 'Доступ запрещен';

class ForbiddenError extends Error {
  constructor(message = DEFAULT_403_ERROR_TEXT) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = { ForbiddenError };
