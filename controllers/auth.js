const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../models/user');

const USER_409_ERROR_TEXT = 'Пользователь с таким email уже существует';

const {
  UserExist, AuthError,
} = require('../utils/Errors');

const rejectPromiseWrongEmailOrPassword = () => Promise.reject(
  new AuthError('Неверное сочетание почты и пароля'),
);

const login = (req, res, next) => {
  const { password, email } = req.body;
  users.findOne({ email }).select('+password')
    .then((userData) => (userData && bcrypt.compare(password, userData.password)
      ? userData : rejectPromiseWrongEmailOrPassword()))
    .then((userData) => {
      const token = jwt.sign({ _id: userData._id }, 'super-strong-secret', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        });

      res.send({ message: 'Всё верно!' });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => users.create({
      email, password: hash, name, about, avatar,
    })
      .then((user) => {
        const {
          name: nameData,
          email: emailData,
          about: aboutData,
          avatar: avatarData,
          _id,
        } = user;

        res.status(201).send({
          data: {
            name: nameData,
            email: emailData,
            about: aboutData,
            avatar: avatarData,
            _id,
          },
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new UserExist(USER_409_ERROR_TEXT));
        } else {
          next(err);
        }
      }));
};

module.exports = {
  createUser,
  login,
};
