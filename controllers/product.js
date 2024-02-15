const { Product, Image, Category, SubCategory, Brand } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include: [
      { model: Image, attributes: ["uri"] },
      { model: Category, attributes: ["name", "image"] },
      { model: SubCategory, attributes: ["name", "image"] },
      { model: Brand, attributes: ["name", "image"] },
    ],
  });
  res.status(200).json(products);
});

exports.getProductById = asyncHandler(async (req, res) => {
  const products = await Product.findByPk(req.params.id, {
    include: Image,
    Category,
    SubCategory,
    Brand,
  });
  res.status(201).json(products);
});

exports.postProduct = asyncHandler(async (req, res, next) => {
  if (req.body.BrandId) {
    const brand = await Brand.findByPk(req.body.BrandId);
    if (!brand) {
      return next(new ApiError("This brand was not found", 404));
    }
  }

  if (req.body.CategoryId) {
    const category = await Category.findByPk(req.body.CategoryId);
    if (!category) {
      return next(new ApiError("This category was not found", 404));
    }
  }

  const image = req.files.image;
  const uploadRes = await cloudinary.uploader.upload(image.tempFilePath, {
    public_id: `${Date.now()}`,
    resource_type: "image",
    folder: "ecommerce-mysql/product",
    // width: 400,
    // crop: "pad",
  });

  let productData = req.body;

  // Create the product
  const product = await Product.create(productData);

  // Associate the product with the category
  if (req.body.CategoryId) {
    await product.setCategory(req.body.CategoryId);
  }

  // Associate the product with the brand
  if (req.body.BrandId) {
    await product.setBrand(req.body.BrandId);
  }

  // Associate the product with the subcategory
  if (req.body.SubCategoryId) {
    const subCategory = await SubCategory.findByPk(req.body.SubCategoryId);
    if (!subCategory) {
      return next(new ApiError("This subcategory was not found", 404));
    }
    await product.addSubCategory(subCategory);
  }

  // Create image associated with the product
  if (req.files.image) {
    await Image.create({ uri: uploadRes.url, ProductId: product.id });
  }

  res.status(201).json(product);
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
