const DEFAULT_400_ERROR_TEXT = 'Переданы некорректные данные';
const DEFAULT_401_ERROR_TEXT = 'Необходима авторизация';
const DEFAULT_500_ERROR_TEXT = 'Упс... произошла ошибка';

const handleDefaultError = (err, res) => res.status(500).send({ message: DEFAULT_500_ERROR_TEXT });

const handle400Error = (res) => res.status(400).send({ message: DEFAULT_400_ERROR_TEXT });
const handle401Error = (res) => res.status(401).send({ message: DEFAULT_401_ERROR_TEXT });
const handle404Error = ({ message }, res) => res.status(404).send({ message });

const handleValidationError = (err, res) => {
  const message = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;
  res.status(400).send({ message });
};

module.exports = {
  handleDefaultError,
  handle400Error,
  handle401Error,
  handle404Error,
  handleValidationError,
};
