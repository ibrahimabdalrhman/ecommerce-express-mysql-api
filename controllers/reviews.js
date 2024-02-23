const { Product, Brand, User, Review } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.addReview = asyncHandler(async (req, res) => {
  const { rating, title } = req.body;
  const UserId = req.user.id;
  const { ProductId } = req.params;
  const review = await Review.create({ ProductId, UserId, rating, title });
  await Review.calcAverageRatingsAndQuantity(ProductId);
  res.status(201).json(review);
});

exports.getReviews = asyncHandler(async (req, res) => {
  const { ProductId } = req.params;
  const reviews = await Review.findAll({ where: { ProductId } });
  res.status(200).json({ reviews });
});

exports.getReviewById = asyncHandler(async (req, res) => {
  const { ProductId } = req.params;
  const { ReviewId } = req.params;
  const review = await Review.findByPk(ReviewId, { where: { ProductId } });
  res.status(200).json({ review });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  const { ReviewId } = req.params;
  const review = await Review.findByPk(ReviewId);
  const { rating, title } = req.body;

  if (req.user.id != review.UserId) {
    return next(
      new ApiError("You do not have the authority to modify this product")
    );
  }
  await review.update(req.body);
  res.status(200).json({ review });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { ReviewId } = req.params;
  const review = await Review.findByPk(ReviewId);

  if (req.user.id != review.UserId) {
    return next(
      new ApiError("You do not have the authority to modify this product")
    );
  }
  await review.destroy();
  res.status(200).json({ review });
});
