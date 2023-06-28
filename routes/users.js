const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
  getUserMe,
} = require('../controllers/users');

const { LINK_PATTERN } = require('../utils/linkPattern');

const validateUserId = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().min(8),
  }),
});

router.get('/', validateUserId, getUsers);
router.get('/:userId', validateUserId, getUserById);
router.get('/me', getUserMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(LINK_PATTERN),
  }),
}), updateUserById);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().min(8),
    avatar: Joi.string().required().pattern(LINK_PATTERN),
  }),
}), updateUserAvatarById);

module.exports = router;
