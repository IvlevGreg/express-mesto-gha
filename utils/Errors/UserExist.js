class UserExist extends Error {
  constructor(message) {
    super();
    this.statusCode = 409;
    this.message = message;
  }
}

module.exports = { UserExist };
