const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createUser,
  login,
} = require('../controllers/auth');

const validate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

router.post('/signin', validate, login);
router.post('/signup', validate, createUser);

module.exports = router;
