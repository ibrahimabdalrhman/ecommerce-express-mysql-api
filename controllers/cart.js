const { CartItem, Cart ,User,Product} = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const { includes } = require("lodash");


exports.addToCart=asyncHandler(async(req,res,next)=>{
    
    const {ProductId,color,quantity}=req.body;
    const UserId=req.user.id;

    let cart=await Cart.findOrCreate({where:{UserId},defaults:{UserId}});
    cart=cart[0];

    const product=await Product.findByPk(ProductId);
     
    const price =product.priceAfterDiscount||product.price;

    const cartItem=await CartItem.create({
        CartId:cart.id,
        ProductId,
        color,
        quantity,
        price
    });
    res.status(201).json({ success: true, data: cartItem });

});

exports.getCart=asyncHandler(async(req,res,next)=>{
    const UserId=req.user.id;
    const cart=await Cart.findOne({where:{UserId},include:CartItem});
    res.status(200).json(cart)

});