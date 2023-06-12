const router = require('express').Router();
const {
  handle404Errors,
} = require('../controllers/errors');

router.all('*', handle404Errors);

module.exports = router;
