const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Wishlist = sequelize.define("Wishlist", {
  ProductId: {
    type: DataTypes.INTEGER,
  },
});

Wishlist.belongsTo(sequelize.models.Product, {
  foreignKey: "ProductId",
  targetKey: "id",
});

module.exports = Wishlist;
