const Review = require('../models/review');
const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'product',
    select: 'name company price',
  });
  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const user = req.user.userId;

  const isValidProduct = await Product.findById(productId);
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user,
  });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Review already submitted for this product'
    );
  }

  req.body.user = user;
  const review = new Review(req.body);
  await review.save();
  res.status(StatusCodes.CREATED).json({ review });
};

const getSingleReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    throw new CustomError.NotFoundError(`No review found with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new CustomError.NotFoundError(`No review found with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);

  if (rating !== undefined) review.rating = rating;
  if (title !== undefined) review.title = title;
  if (comment !== undefined) review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new CustomError.NotFoundError(`No review found with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);

  await review.remove();
  res.status(StatusCodes.OK).json({ msg: 'Review deleted successfully' });
};

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
