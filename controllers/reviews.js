const { Product, Brand, User, Review } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.addReview = asyncHandler(async (req, res) => {
  const { rating, title } = req.body;
  const UserId = req.user.id;
  const { ProductId } = req.params;
  const review = await Review.create({ ProductId, UserId, rating, title });

  res.status(201).json(review);
});
