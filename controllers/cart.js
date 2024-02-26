const { CartItem, Cart, User, Product } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const { includes } = require("lodash");
const { where } = require("sequelize");

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.CartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  return totalPrice;
};

exports.addToCart = asyncHandler(async (req, res, next) => {
  const { ProductId, color, quantity } = req.body;
  const UserId = req.user.id;

  let userCart = await Cart.findOrCreate({
    where: { UserId },
    defaults: { UserId },
  });
  userCart = userCart[0];

  const product = await Product.findByPk(ProductId);
  const price = product.priceAfterDiscount || product.price;
  const cartItem = await CartItem.create({
    CartId: userCart.id,
    ProductId,
    color,
    quantity,
    price,
  });

  const cart = await Cart.findByPk(userCart.id, { include: CartItem });

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(201).json({ success: true, data: cart });
});

exports.getCart = asyncHandler(async (req, res, next) => {
  const UserId = req.user.id;
  const cart = await Cart.findOne({ where: { UserId }, include: CartItem });
  res.status(200).json(cart);
});

exports.deleteItemFromCart = asyncHandler(async (req, res, next) => {
  const UserId = req.user.id;
  const { CartItemId } = req.body;
  console.log(req.body);
  console.log(CartItemId);
  const cartItem = await CartItem.findByPk(CartItemId);
  await cartItem.destroy();
  const cart = await Cart.findOne({ where: { UserId }, include: CartItem });
  res.status(200).json(cart);
});

exports.clearCart= asyncHandler(async (req, res, next) => {
    const UserId = req.user.id;

    const cart = await Cart.findOne({ where: { UserId }, include: CartItem });
    cart.totalCartPrice=0;
    cart.save();
    const cartItems = await CartItem.destroy({where:{CartId:cart.id}});
    // await cartItems.destroy();
    res.status(200).json(cart);


});