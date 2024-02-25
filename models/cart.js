const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cart = sequelize.define("Cart", {
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCartPrice: {
    type: DataTypes.FLOAT,
  },
});




module.exports = Cart;
