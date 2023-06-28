const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../models/user');

const {
  handle400Error, handle401Error, handleValidationError, handleDefaultError,
} = require('../utils/handleErrors');

const rejectPromiseWrongEmailOrPassword = () => Promise.reject(new Error('Неправильные почта или пароль'));

const login = (req, res) => {
  const { password, email } = req.body;
  users.findOne({ email }).select('+password')
    .then((userData) => userData && bcrypt.compare(password, userData.password
      ? userData : rejectPromiseWrongEmailOrPassword()))
    .then((userData) => {
      res.send({ message: 'Всё верно!' });

      const token = jwt.sign({ _id: userData._id }, 'super-strong-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        });
    })
    .catch((err) => handle401Error(err, res));
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!(email && password)) {
    return handle400Error(res);
  }

  bcrypt.hash(password, 10).then((hash) => users.create({
    email, password: hash, name, about, avatar,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return handleValidationError(err, res);
      return handleDefaultError(err, res);
    }));
};

module.exports = {
  createUser,
  login,
};
