const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  getUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/user-controller');

router.route('/').get(getAllUsers);

router.route('/show-me').get(getUser);
router.route('/update-user').patch(updateUser);
router.route('/update-user-password').patch(updateUserPassword);

router.route('/:id').get(getSingleUser);

module.exports = router;
