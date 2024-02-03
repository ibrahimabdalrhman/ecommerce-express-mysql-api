const { DataTypes } = require('sequelize');;
const sequelize = require('../config/database');

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sold: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  priceAfterDiscount: {
    type: DataTypes.FLOAT,
  },
  ratingsAverage: {
    type: DataTypes.FLOAT,
    validate: {
      min: 1,
      max: 5,
    },
  },
  ratingsQuantity: {
    type: DataTypes.INTEGER,
    defaultValue:0,
  },
});



module.exports=Product;
