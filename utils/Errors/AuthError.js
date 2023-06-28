const DEFAULT_401_ERROR_TEXT = 'Необходима авторизация';

class AuthError extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = DEFAULT_401_ERROR_TEXT;
  }
}

module.exports = { AuthError };
