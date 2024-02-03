const { Product, Image } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include: Image,
  });
  res.status(201).json(products);
});

exports.getProductById = asyncHandler(async (req, res) => {
  const products = await Product.findByPk(req.params.id, {
    include: Image,
  });
  res.status(201).json(products);
});

exports.postProduct = asyncHandler(async (req, res) => {
  console.log("req.files.image ===>", req.files.image);
  console.log("req.body ===>", req.body);
  const image = req.files.image;
  const uploadRes = await cloudinary.uploader.upload(image.tempFilePath, {
    public_id: `${Date.now()}`,
    resource_type: "image",
    folder: "ecommerce-mysql",
    // width: 400,
    // crop: "pad",
  });
  console.log("uploadRes ===>", uploadRes);

  const products = await Product.create(req.body);
  if (req.files.image) {
    const newImage = await products.createImage({ uri: uploadRes.url });
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

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: Image,
  });
  await product.destroy();
  res.status(200).json(product);
});
