const jwt = require('jsonwebtoken');
const users = require('../models/user');

const {
  handleDefaultError, handle400Error, handleValidationError,
  handle404Error,
} = require('../utils/handleErrors');

const getUsers = (req, res) => {
  users.find({})
    .then((usersData) => res.send({ data: usersData }))
    .catch((err) => handleDefaultError(err, res));
};

const findUserById = (userId, res) => users.findById(userId)
  .then((usersData) => (usersData ? res.send({ data: usersData }) : handle404Error({ message: 'Пользователь не найден' }, res)))
  .catch((err) => {
    if (err.name === 'CastError') return handle400Error(res);
    handleDefaultError(err, res);
  });

const getUserById = (req, res) => {
  const { userId } = req.params;

  findUserById(res, userId);
};

const getUserMe = (req, res) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify({ token }, 'super-strong-secret');

  findUserById(userId, res);
};

const updateUserById = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  users.findByIdAndUpdate(userId, { name, about }, { returnDocument: 'after', runValidators: true })
    .then((usersData) => (usersData ? res.send({ data: usersData }) : handle404Error({ message: 'Пользователь не найден' }, res)))
    .catch((err) => {
      if (err.name === 'ValidationError') return handleValidationError(err, res);
      return handleDefaultError(err, res);
    });
};

const updateUserAvatarById = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  users.findByIdAndUpdate(userId, { avatar }, { returnDocument: 'after', runValidators: true })
    .then((usersData) => (usersData ? res.send({ data: usersData }) : handle404Error({ message: 'Пользователь не найден' }, res)))
    .catch((err) => {
      if (err.name === 'ValidationError') return handleValidationError(err, res);
      return handleDefaultError(err, res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
  getUserMe,
};
