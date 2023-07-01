const DEFAULT_403_ERROR_TEXT = 'Доступ запрещен';

class ForbiddenError extends Error {
  constructor(message = DEFAULT_403_ERROR_TEXT) {
    super();
    this.statusCode = 403;
    this.message = message;
  }
}

module.exports = { ForbiddenError };
