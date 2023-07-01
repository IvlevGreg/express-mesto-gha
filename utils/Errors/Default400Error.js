const DEFAULT_400_ERROR_TEXT = 'Переданы некорректные данные';

class Default400Error extends Error {
  constructor(message = DEFAULT_400_ERROR_TEXT) {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

module.exports = { Default400Error };
