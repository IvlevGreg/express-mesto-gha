const getValidationErrorText = (errors) => `${Object.values(errors).map((error) => error.message).join(', ')}`;

class ValidationError extends Error {
  constructor(errors) {
    super();
    this.statusCode = 400;
    this.message = getValidationErrorText(errors);
  }
}

module.exports = { ValidationError };
