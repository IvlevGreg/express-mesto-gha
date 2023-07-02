const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { LINK_PATTERN } = require('../utils/LINK_PATTERN');

const {
  getCards,
  deleteCardById,
  createCard,
  putLikeByCardId,
  deleteLikeByCardId,
} = require('../controllers/cards');
// [https://[A-Z0-9-._~:/?#[]@!$&'()*+,;=]]$/

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(LINK_PATTERN),
  }),
});

router.get('/', getCards);

router.post('/', createCardValidation, createCard);

router.put('/:cardId/likes', validateCardId, putLikeByCardId);

router.delete('/:cardId/likes', validateCardId, deleteLikeByCardId);
router.delete('/:cardId', validateCardId, deleteCardById);

module.exports = router;
