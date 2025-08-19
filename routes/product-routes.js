const express = require('express');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const { ADMIN_ROLES } = require('../utils');

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/product-controller');

const router = express.Router();

router
  .route('/')
  .post([authenticateUser, authorizePermissions(...ADMIN_ROLES)], createProduct)
  .get(getAllProducts);

router
  .route('/upload-image')
  .post([authenticateUser, authorizePermissions(...ADMIN_ROLES)], uploadImage);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch(
    [authenticateUser, authorizePermissions(...ADMIN_ROLES)],
    updateProduct
  )
  .delete(
    [authenticateUser, authorizePermissions(...ADMIN_ROLES)],
    deleteProduct
  );

module.exports = router;
