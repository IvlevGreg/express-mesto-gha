const users = require('../models/user');

const {
  NotFoundError,
} = require('../utils/Errors');

const {
  getVerifyDataFromToken,
} = require('../utils/getVerifyDataFromToken');

const NOT_FOUND_USER_ERROR_TEXT = 'Пользователь не найден';

const getUsers = (req, res, next) => {
  users.find({})
    .then((usersData) => res.send(usersData))
    .catch(next);
};

const sendUsersData = (usersData, res) => {
  if (usersData) {
    res.send(usersData);
    return;
  }
  throw new NotFoundError(NOT_FOUND_USER_ERROR_TEXT);
};

const findUserById = (userId, res, next) => users.findById(userId)
  .then((usersData) => sendUsersData(usersData, res))

  .catch(() => next(new NotFoundError(NOT_FOUND_USER_ERROR_TEXT)));

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  findUserById(userId, res, next);
};

const getUserMe = (req, res, next) => {
  const token = getVerifyDataFromToken(req);

  findUserById(token, res, next);
};

const updateUserById = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  users.findByIdAndUpdate(userId, { name, about }, { returnDocument: 'after', runValidators: true })
    .then((usersData) => sendUsersData(usersData, res))
    .catch(next);
};

const updateUserAvatarById = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  users.findByIdAndUpdate(userId, { avatar }, { returnDocument: 'after', runValidators: true })
    .then((usersData) => sendUsersData(usersData, res))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  getUserMe,
  updateUserAvatarById,
};
