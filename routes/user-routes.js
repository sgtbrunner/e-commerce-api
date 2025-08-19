const express = require('express');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const { ADMIN_ROLES } = require('../utils');

const {
  getAllUsers,
  getSingleUser,
  getUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/user-controller');

const router = express.Router();

router
  .route('/')
  .get(authenticateUser, authorizePermissions(...ADMIN_ROLES), getAllUsers);

router.route('/show-me').get(authenticateUser, getUser);
router.route('/update-user').patch(authenticateUser, updateUser);
router
  .route('/update-user-password')
  .patch(authenticateUser, updateUserPassword);

router
  .route('/:id')
  .get(authenticateUser, authorizePermissions(...ADMIN_ROLES), getSingleUser);

module.exports = router;
