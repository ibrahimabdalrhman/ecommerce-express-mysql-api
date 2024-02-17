const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define("Comment", {
  comment: {
    type: DataTypes.TEXT,
  },
});


module.exports = Comment;
