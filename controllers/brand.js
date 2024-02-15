const { Brand,SubCategory, Category } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");

exports.getBrands = asyncHandler(async (req, res) => {
  const Brands = await Brand.findAll();
  res.status(200).json(Brands);
});

exports.getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);
  res.status(200).json(brand);
});

exports.postBrand = asyncHandler(async (req, res) => {
  const image = req.files.image;

  const uploadRes = await cloudinary.uploader.upload(image.tempFilePath, {
    public_id: `${Date.now()}`,
    resource_type: "image",
    folder: "ecommerce-mysql/brands",
    // width: 400,
    // crop: "pad",
  });
  req.body.image = uploadRes.url;
  const brand = await Brand.create(req.body);

  res.status(201).json(brand);
});

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findByPk(req.params.id);

  if (!brand) {
    return next(new ApiError("Brand not found", 404));
  }

  if (req.files && req.files.image) {
    const image = req.files.image;
    const uploadRes = await cloudinary.uploader.upload(image.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "image",
      folder: "ecommerce-mysql/brands",
    });
    req.body.image = uploadRes.url;
  }

  await brand.update(req.body);
  res.status(200).json(brand);
});


exports.deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);
  await brand.destroy();
  res.status(200).json(brand);
});
