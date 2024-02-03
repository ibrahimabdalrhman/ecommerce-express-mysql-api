const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubCategory = sequelize.define("SubCategory", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


module.exports = SubCategory;
