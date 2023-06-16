const DEFAULT_400_ERROR_TEXT = 'Переданы некорректные данные';
const DEFAULT_500_ERROR_TEXT = 'Упс... произошла ошибка';

const handleErrors = (err, res) => res.status(500).send({ message: DEFAULT_500_ERROR_TEXT });
const handle400Error = (res) => res.status(400).send({ message: DEFAULT_400_ERROR_TEXT });
const handle404Error = ({ message }, res) => res.status(404).send({ message });
const handleValidationError = (err, res) => {
  const message = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;
  res.status(400).send({ message });
};

module.exports = {
  handleDefaultError: handleErrors,
  handle400Error,
  handle404Error,
  handleValidationError,
};
