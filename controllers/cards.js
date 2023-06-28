const cards = require('../models/card');

const {
  ValidationError, Default400Error, NotFoundError,
} = require('../utils/Errors');

const getCards = (req, res, next) => {
  cards.find({})
    .then((cardsData) => res.send({ data: cardsData }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;

  cards.findByIdAndRemove(cardId)
    .then((cardsData) => {
      if (cardsData) {
        res.send({ data: cardsData });
        return;
      }

      throw new NotFoundError('Карточка не найдена');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new Default400Error());
      next();
    });
};

const deleteLikeByCardId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cards.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .then((like) => {
      if (like) {
        res.send({ data: like });
        return;
      }
      throw new NotFoundError('Карточка не найдена');
    })

    .catch((err) => {
      if (err.name === 'CastError') next(new Default400Error());
      next();
    });
};

const putLikeByCardId = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((like) => {
      if (like) {
        res.send({ data: like });
        return;
      }
      throw new NotFoundError('Карточка не найдена');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new Default400Error());
      next();
    });
};

const createCard = (req, res, next) => {
  const {
    name, link,
  } = req.body;
  const userId = req.user._id;

  if (!(name && link)) {
    throw new Default400Error();
  }

  cards.create({
    name, link, owner: userId,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new ValidationError(err.errors));
      return next();
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  deleteLikeByCardId,
  putLikeByCardId,
};
