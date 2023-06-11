const users = require('../models/user');
const {
  handleDefaultError, handle400Error, handleValidationError,
  handle404Error,
} = require('../utils/handleErrors');

const getUsers = (req, res) => {
  users.find({})
    .then((usersData) => res.status(200).send({ data: usersData }))
    .catch((err) => handleDefaultError(err, res));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  users.findById(userId)
    .then((usersData) => (usersData ? res.status(200).send({ data: usersData }) : handle404Error({ message: 'Пользователь не найден' }, res)))
    .catch((err) => handleDefaultError(err, res));
};

const updateUserById = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  users.findByIdAndUpdate(userId, { name, about }, { returnDocument: 'after', runValidators: true })
    .then((usersData) => (usersData ? res.status(200).send({ data: usersData }) : handle404Error({ message: 'Пользователь не найден' }, res)))
    .catch((err) => {
      if (err.name === 'ValidationError') return handleValidationError(err, res);
      return handleDefaultError(err, res);
    });
};

const updateUserAvatarById = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  users.findByIdAndUpdate(userId, { avatar }, { returnDocument: 'after', runValidators: true })
    .then((usersData) => (usersData ? res.status(200).send({ data: usersData }) : handle404Error({ message: 'Пользователь не найден' }, res)))
    .catch((err) => {
      if (err.name === 'ValidationError') return handleValidationError(err, res);
      return handleDefaultError(err, res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (!(name && about && avatar)) {
    return handle400Error(res);
  }

  users.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return handleValidationError(err, res);
      return handleDefaultError(err, res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  updateUserAvatarById,
};
