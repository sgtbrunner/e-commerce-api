const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { MAX_FILE_SIZE } = require('../utils/constants');
const path = require('path');

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  return res.status(StatusCodes.OK).json({ count: products.length, products });
};

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);

  return res.status(StatusCodes.CREATED).json({ product });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId).populate('reviews');

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id: ${productId}`
    );
  }

  return res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id: ${productId}`
    );
  }

  return res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id: ${productId}`
    );
  }

  await product.remove();

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Product deleted successfully' });
};

const uploadImage = async (req, res) => {
  if (!req.files || !req.files.image) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'No image file uploaded' });
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Uploaded file is not an image' });
  }

  if (productImage.size > MAX_FILE_SIZE) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Image size should not exceed 1MB' });
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + productImage.name
  );

  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
