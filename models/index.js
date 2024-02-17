const Product = require("./product");
const Image = require("./image");
const Category = require("./category");
const Brand = require("./brand");
const SubCategory = require("./subCategory");
const User = require("./user");
const Wishlist = require("./wishlist");
const sequelize = require("../config/database");

Product.hasMany(Image);
Image.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category);

Product.belongsToMany(SubCategory, { through: "subcategoryProduct" });
SubCategory.belongsToMany(Product, { through: "subcategoryProduct" });

User.hasMany(Product);
Product.belongsTo(User);

User.hasMany(Wishlist);
Wishlist.belongsTo(User);


sequelize
  .sync({
    // alter: true
  })
  .then("database connected ...")
  .catch((err) => {
    console.log("database err : ", err);
  });

module.exports = {
  Product,
  Image,
  Category,
  Brand,
  SubCategory,
  User,
  Wishlist,
};
