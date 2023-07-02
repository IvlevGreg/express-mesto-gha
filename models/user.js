const mongoose = require('mongoose');
const validator = require('validator');
const { validateLink } = require('./utils/validateLink');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    dropDups: true,
    validate: {
      validator: validator.isEmail,
      message: 'Неправильный формат почты',
    },
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: validateLink,
  },
});

module.exports = mongoose.model('user', userSchema);
