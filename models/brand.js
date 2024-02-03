const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Brand = sequelize.define("Brand", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


module.exports = Brand;
