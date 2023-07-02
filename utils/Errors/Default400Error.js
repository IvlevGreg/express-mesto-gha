const DEFAULT_400_ERROR_TEXT = 'Переданы некорректные данные';

class Default400Error extends Error {
  constructor(message = DEFAULT_400_ERROR_TEXT) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = { Default400Error };
