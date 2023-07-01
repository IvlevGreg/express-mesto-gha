const DEFAULT_401_ERROR_TEXT = 'Необходима авторизация';

class AuthError extends Error {
  constructor(message = DEFAULT_401_ERROR_TEXT) {
    super();
    this.statusCode = 401;
    this.message = message;
  }
}

module.exports = { AuthError };
