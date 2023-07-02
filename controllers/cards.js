const cards = require('../models/card');

const NOT_FOUND_CARD_ERROR_TEXT = 'Карточка не найдена';

const {
  Default400Error, NotFoundError, ForbiddenError,
} = require('../utils/Errors');

const getCards = (req, res, next) => {
  cards.find({})
    .then((cardsData) => res.send({ data: cardsData }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;

  cards.findById(cardId)
    .orFail(new NotFoundError(NOT_FOUND_CARD_ERROR_TEXT))
    .then((cardsData) => {
      const { _id } = req.user;

      if (_id !== cardsData.owner.toHexString()) {
        next(new ForbiddenError('Вы пытаетесь удалить карточку другого пользователя'));
        return;
      }

      cards.deleteOne({ _id: cardId })
        .then(() => res.send({ data: cardsData }))
        .catch((err) => {
          if (err === 'CastError') {
            next(new Default400Error('Ошибка удаления карточки'));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

const deleteLikeByCardId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cards.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError(NOT_FOUND_CARD_ERROR_TEXT))
    .then((like) => res.send({ data: like }))
    .catch(next);
};

const putLikeByCardId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundError(NOT_FOUND_CARD_ERROR_TEXT))
    .then((like) => res.send({ data: like }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const {
    name, link,
  } = req.body;
  const userId = req.user._id;

  cards.create({
    name, link, owner: userId,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch(next);
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  deleteLikeByCardId,
  putLikeByCardId,
};
