const { User } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");
const { empty } = require("statuses");

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.status(200).json(user);
});

exports.postUser = asyncHandler(async (req, res) => {
  if (req.files) {
    const profileImage = req.files.profileImage;
      const uploadRes = await cloudinary.uploader.upload(
        profileImage.tempFilePath,
        {
          public_id: `${Date.now()}`,
          resource_type: "image",
          folder: "ecommerce-mysql/users",
          // width: 400,
          // crop: "pad",
        }
      );
  
    req.body.profileImage = uploadRes.url;
  }
  if (req.body.profileImage == "") {
    req.body.profileImage = undefined;
  }
  const user = await User.create(req.body);

  res.status(201).json(user);
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  if (req.files && req.files.profileImage) {
    const profileImage = req.files.profileImage;
    const uploadRes = await cloudinary.uploader.upload(
      profileImage.tempFilePath,
      {
        public_id: `${Date.now()}`,
        resource_type: "image",
        folder: "ecommerce-mysql/User",
      }
    );
    req.body.profileImage = uploadRes.url;
  }

  await user.update(req.body);
  res.status(200).json(user);
});


exports.deleteUser= asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.status(200).json(user);
});
