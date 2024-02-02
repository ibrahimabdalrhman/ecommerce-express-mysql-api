const {Product ,Image} = require("./product");
const sequelize = require("../config/database");

sequelize
  .sync({ alter:true })
  .then("database connected ...")
  .catch((err) => {
    console.log("database err : ", err);
  });

module.exports = { Product, Image };
