class ForbiddenError extends Error {
  constructor(message = 'Доступ запрещен') {
    super();
    this.statusCode = 403;
    this.message = message;
  }
}

module.exports = { ForbiddenError };
