const {
  CartItem,
  Cart,
  User,
  Product,
  Order,
  OrderItem,
} = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.addOrder = asyncHandler(async (req, res, next) => {
  const { cartId } = req.params;
  const cart = await Cart.findByPk(cartId, { include: CartItem });
  const totalOrderPrice = cart.totalCartPrice;
  const UserId = req.user.id;
  const { shippingAddress } = req.body;

  console.log(cart);

  const newOrder = await Order.create(
    {
      UserId,
      totalOrderPrice,
      shippingAddress,
    });
  for (const item of cart.CartItems) {
    const orderItem = await OrderItem.create({
      OrderId: newOrder.id,
      ProductId: item.ProductId,
      price: item.price,
      color: item.color,
      quantity: item.quantity,
    });
    await item.destroy();
  };

  cart.totalCartPrice = 0;
  await cart.save();
const order=await Order.findByPk(newOrder.id,{include:OrderItem})

  res.json(order);
});

exports.getOrders = asyncHandler(async (req, res, next) => {
  const UserId = req.user.id;
  const orders = await Order.findAll({ where: { UserId }, include: OrderItem });
  res.json(orders);
});
