const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Image = sequelize.define("Image", {
  uri: {
    type: DataTypes.TEXT,
  },
});


module.exports = Image;