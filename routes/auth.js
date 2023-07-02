const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createUser,
  login,
} = require('../controllers/auth');
const { LINK_PATTERN } = require('../utils/LINK_PATTERN');

const validateEmailAndPasswordField = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
};

const usersFields = {
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().pattern(LINK_PATTERN),
};

const signinValidate = celebrate({
  body: Joi.object().keys({
    ...validateEmailAndPasswordField,
  }),
});

const signupValidate = celebrate({
  body: Joi.object().keys({
    ...validateEmailAndPasswordField,
    ...usersFields,
  }),
});

router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUser);

module.exports = router;
