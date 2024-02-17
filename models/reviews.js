const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define("Review", {
  title: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  ProductId: {
    type: DataTypes.INTEGER,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
});


Review.belongsTo(sequelize.models.Product, {
  foreignKey: "ProductId",
  targetKey: "id",
});
Review.belongsTo(sequelize.models.User, {
  foreignKey: "UserId",
  targetKey: "id",
});

module.exports = Review;
