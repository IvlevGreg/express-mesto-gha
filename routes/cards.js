const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { LINK_PATTERN } = require('../utils/linkPattern');

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
    cardId: Joi.string().required().min(5),
  }),
});

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .pattern(LINK_PATTERN),
  }),
}), createCard);

router.put('/:cardId/likes', validateCardId, putLikeByCardId);

router.delete('/:cardId/likes', validateCardId, deleteLikeByCardId);
router.delete('/:cardId', validateCardId, deleteCardById);

module.exports = router;
