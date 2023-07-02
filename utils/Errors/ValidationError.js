class ValidationError extends Error {
  constructor(message) {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

module.exports = { ValidationError };
