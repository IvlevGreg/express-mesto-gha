const router = require('express').Router();

const {
  getCards,
  deleteCardById,
  createCard,
  putLikeByCardId,
  deleteLikeByCardId,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', deleteCardById);
router.post('/', createCard);
router.put('/:cardId/likes', putLikeByCardId);
router.delete('/:cardId/likes', deleteLikeByCardId);

module.exports = router;
