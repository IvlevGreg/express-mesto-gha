const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
  getUserMe,
} = require('../controllers/users');

const { LINK_PATTERN } = require('../utils/LINK_PATTERN');

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const validatePatchMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validatePatchMeAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(LINK_PATTERN),
  }),
});

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', validateUserId, getUserById);

router.patch('/me', validatePatchMe, updateUserById);
router.patch('/me/avatar', validatePatchMeAvatar, updateUserAvatarById);

module.exports = router;
