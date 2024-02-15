const { SubCategory, Category } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");

exports.getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findAll({
    include: SubCategory,
  });
  res.status(200).json(category);
});

exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: SubCategory,
  });
  res.status(200).json(category);
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
  req.body.image = uploadRes.url;
  const category = await Category.create(req.body);

  res.status(201).json(category);
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    return next(new ApiError("Category not found", 404));
  }

  if (req.files && req.files.image) {
    const image = req.files.image;
    const uploadRes = await cloudinary.uploader.upload(image.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "image",
      folder: "ecommerce-mysql/category",
    });
    req.body.image = uploadRes.url;
  }

  await category.update(req.body);
  res.status(200).json(category);
});


exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  await category.destroy();
  res.status(200).json(category);
});
