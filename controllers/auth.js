const { User } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const createToken = (payload) =>
  jwt.sign({ UserId: payload }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });


exports.signup = asyncHandler(async (req, res) => {

  const user = await User.create(req.body);

  res.status(201).json(user);
});

exports.login = asyncHandler(async (req, res, next) => {

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(new ApiError("incorrect email or password"), 401);
  }
  const correct = await bcrypt.compare(req.body.password, user.password,);
  if (!correct) {
    return next(new ApiError("incorrect email or password"), 401);
  }
  const token = createToken(user.id);
  res.status(200).json({
    msg: `welcome ${user.name}`,
    user,
    token
  });
});

exports.protect = asyncHandler(async (req, res, next) => { 
  if (!req.headers.authorization) {
    return next(new ApiError("you must login to access this route ", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  console.log(req.headers.authorization);
  if (!token) {
    return next(new ApiError("you must login to access this route ", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Check whether the decoded UserId is stored in the database.
    const currentUser = await User.findByPk(decoded.UserId);
    if (!currentUser) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    req.user = currentUser;
    console.log(req.user);
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    next(err);
  }
});


// exports.profileImage = asyncHandler(async (req, res, next) => {
  
//   const user=await User.find




// })



