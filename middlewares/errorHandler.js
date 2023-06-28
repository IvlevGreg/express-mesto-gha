const getValidationErrorText = (errors) => `${Object.values(errors).map((error) => error.message).join(', ')}`;

const DEFAULT_400_ERROR_TEXT = 'Переданы некорректные данные';
const DEFAULT_500_ERROR_TEXT = 'Упс... произошла ошибка';

module.exports = (err, req, res, next) => {
  let { statusCode, message } = err;
  const { name } = err;

  switch (name) {
    case 'ValidationError':
      statusCode = 400;
      message = getValidationErrorText(err);
      break;
    case 'CastError':
      statusCode = 400;
      message = DEFAULT_400_ERROR_TEXT;
      break;
    default:
      if (!statusCode) statusCode = 500;
      if (!message) message = DEFAULT_500_ERROR_TEXT;
  }

  res
    .status(statusCode)
    .send({ message });

  next();
};
