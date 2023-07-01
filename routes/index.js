const router = require('express').Router();

const auth = require('../middlewares/auth');

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const authRoutes = require('./auth');
const errorsRoutes = require('./errorsRoutes');

router.use('/', authRoutes);

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

router.use('*', auth, errorsRoutes);

module.exports = router;
