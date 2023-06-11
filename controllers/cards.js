const cards = require('../models/card');
const {
  handleDefaultError, handle400Error, handle404Error, handleValidationError,
} = require('../utils/handleErrors');

const getCards = (req, res) => {
  cards.find({})
    .then((cardsData) => res.status(200).send({ data: cardsData }))
    .catch((err) => handleDefaultError(err, res));
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  cards.findByIdAndRemove(cardId)
    .then((cardsData) => (cardsData ? res.status(200).send({ data: cardsData }) : handle404Error({ message: 'Карточка не найдена' }, res)))
    .catch((err) => handleDefaultError(err, res));
};

const deleteLikeByCardId = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user._id;

  cards.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .then((like) => (like ? res.status(200).send({ data: like }) : handle404Error({ message: 'Карточка не найдена' }, res)))
    .catch((err) => handleDefaultError(err, res));
};

const putLikeByCardId = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user._id;

  cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((like) => (like ? res.status(200).send({ data: like }) : handle404Error({ message: 'Карточка не найдена' }, res)))
    .catch((err) => handleDefaultError(err, res));
};

const createCard = (req, res) => {
  const {
    name, link, owner, likes, createdAt,
  } = req.body;
  if (!(name && link)) {
    return handle400Error(res);
  }

  cards.create({
    name, link, owner, likes, createdAt,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return handleValidationError(err, res);

      return handleDefaultError(err, res);
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  deleteLikeByCardId,
  putLikeByCardId,
};
