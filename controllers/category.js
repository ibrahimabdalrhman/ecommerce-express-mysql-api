const {  Image ,Category} = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");

exports.getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findAll({
    include: Image,
  });
  res.status(201).json(category);
});

exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: Image,
  });
  res.status(201).json(category);
});

exports.postCategory = asyncHandler(async (req, res) => {

  const image = req.files.image;
  const uploadRes = await cloudinary.uploader.upload(image.tempFilePath, {
    public_id: `${Date.now()}`,
    resource_type: "image",
    folder: "ecommerce-mysql/category",
    // width: 400,
    // crop: "pad",
  });

  const category = await Category.create(req.body);
  if (req.files.image) {
    const newImage = await category.createImage({ uri: uploadRes.url });
  }
  res.status(200).json(category);
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    returnnext(new ApiError("Category not found", 404));
  }
  await category.update(req.body);
  if (req.body.image) {
    const newImage = await Image.create({ uri: req.body.image });
    await category.addImage(newImage);
  }
  res.status(200).json(category);
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: Image,
  });
  await category.destroy();
  res.status(200).json(category);
});
