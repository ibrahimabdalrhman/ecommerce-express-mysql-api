const { SubCategory, Category } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");

exports.getSubCategory = asyncHandler(async (req, res) => {
  const subcategory = await SubCategory.findAll({
    include: Category,
  });
  res.status(200).json(subcategory);
});

exports.getSubCategoryById = asyncHandler(async (req, res) => {
  const subcategory = await SubCategory.findByPk(req.params.id, {
    include: Category,
  });
  res.status(200).json(subcategory);
});

exports.postSubCategory = asyncHandler(async (req, res) => {
  const image = req.files.image;

  const uploadRes = await cloudinary.uploader.upload(image.tempFilePath, {
    public_id: `${Date.now()}`,
    resource_type: "image",
    folder: "ecommerce-mysql/subcategory",
    // width: 400,
    // crop: "pad",
  });
  req.body.image = uploadRes.url;
  const category = await SubCategory.create(req.body);

  res.status(201).json(category);
});

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findByPk(req.params.id);

  if (!subCategory) {
    return next(new ApiError("subCategory not found", 404));
  }

  if (req.files && req.files.image) {
    const image = req.files.image;
    const uploadRes = await cloudinary.uploader.upload(image.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "image",
      folder: "ecommerce-mysql/subCategory",
    });
    req.body.image = uploadRes.url;
  }

  await subCategory.update(req.body);
  res.status(200).json(subCategory);
});


exports.deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findByPk(req.params.id);
  await subCategory.destroy();
  res.status(200).json(subCategory);
});
