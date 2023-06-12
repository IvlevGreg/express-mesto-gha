const router = require('express').Router();
const {
  handle404Errors,
} = require('../controllers/errors');

router.get('*', handle404Errors);

module.exports = router;
