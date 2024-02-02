const { Product, Image } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include: Image,
  });
  res.status(201).json(products);
});

exports.getProductById = asyncHandler(async (req, res) => {
  const products = await Product.findOne(req.params.id, {
    include: Image,
  });
  res.status(201).json(products);
});

exports.postProduct = asyncHandler(async (req, res) => {
  const products = await Product.create(req.body);
  if (req.body.image) {
    const newImage = await products.createImage({ uri: req.body.image });
  }
  res.status(200).json(products);
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    returnnext(new ApiError("product not found", 404));
  }
  await product.update(req.body);
  if (req.body.image) {
    const newImage = await Image.create({ uri: req.body.image });
    await product.addImage(newImage);
  }
  res.status(200).json(product);
});

// exports.postProduct = asyncHandler(async (req, res) => {
//   const products = await Product.create(req.body);
//   if (req.body.image) {
//     const newImage = await products.createImage({ uri: req.body.image });
//   }
//   res.status(200).json(products);
// });
