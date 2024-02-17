const { Comment, Product, User } = require("../models");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

exports.addComment = asyncHandler(async (req, res) => {
  const { ProductId } = req.params;
  const UserId = req.user.id;
  const { comment } = req.body;
  const newComment = await Comment.create({ ProductId, UserId, comment });

  res.status(201).json(newComment);
});

exports.getAllComments = asyncHandler(async (req, res) => {
  const { ProductId } = req.params;
  const UserId = req.user.id;
  const comments = await Comment.findAll({ where: { ProductId } });

  res.status(200).json(comments);
});

exports.deleteComment = asyncHandler(async (req, res,next) => {
  const { ProductId } = req.params;
  const UserId = req.user.id;
  const userRole = req.user.role.toString();

  const comment = await Comment.findByPk(req.params.CommentId);
  if (req.user.id != comment.UserId) {
    if (userRole === "admin" || userRole === "manager") {
    } else {
      return next(
        new ApiError("You do not have the authority to delete this comment")
      );
    }
  }
  await comment.destroy();
  res.status(200).json(comment);
});
