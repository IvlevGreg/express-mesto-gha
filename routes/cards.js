const router = require('express').Router();

const {
  getCards,
  deleteCardById,
  createCard,
  putLikeByCardId,
  deleteLikeByCardId,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/cards/:cardId', deleteCardById);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', putLikeByCardId);
router.delete('/cards/:cardId/likes', deleteLikeByCardId);

module.exports = router;
