const DEFAULT_400_ERROR_TEXT = 'Переданы некорректные данные';

class Default400Error extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = DEFAULT_400_ERROR_TEXT;
  }
}

module.exports = { Default400Error };
