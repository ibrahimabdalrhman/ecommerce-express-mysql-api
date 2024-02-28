const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalOrderPrice: {
    type: DataTypes.FLOAT,
    defaultValue:0,
  },
  shippingAddress:{
    type:DataTypes.TEXT,
    allowNull:false
  },

});




module.exports = Order;
