const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
  getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getUserMe);

router.patch('/me', updateUserById);
router.patch('/me/avatar', updateUserAvatarById);

module.exports = router;
