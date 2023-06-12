const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const errorsRoutes = require('./errorsRoutes');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('*', errorsRoutes);

module.exports = router;
