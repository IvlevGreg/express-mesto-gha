const router = require('express').Router();
const {
  handle404Errors,
} = require('../controllers/handle404Errors');

router.all('*', handle404Errors);

module.exports = router;
