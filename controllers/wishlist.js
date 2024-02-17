const { Wishlist, User, Product } = require("../models/index");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const { whitelist } = require("validator");

exports.addOrDeleteFromList = asyncHandler(async (req, res, next) => {
  const ProductId = req.body.ProductId;
  const UserId = req.user.id;
  const user = await User.findByPk(UserId);
  //check if this product in user's wishlist
  const wishlist = await Wishlist.findOne({ where: { ProductId, UserId } });
  if (wishlist) {
    await wishlist.destroy();
    res.status(200).json({
      msg: "removed product from your wishlist",
      wishlist,
    });
  } else {
    const newWishlist = await Wishlist.create({ ProductId, UserId });
    res.status(201).json({
      msg: "added product from your wishlist",
      newWishlist,
    });
  }
});

exports.getWishlist = asyncHandler(async (req, res, next) => {
  const UserId = req.user.id;
  const wishlist = await Wishlist.findAll({ where: { UserId }, include: { model: Product } });
  res.status(200).json(wishlist);
});
