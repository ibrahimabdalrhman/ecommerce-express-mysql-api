const Product = require("./product");
const Image = require("./image");
const Category = require("./category");
const Brand = require("./brand");
const SubCategory = require("./subCategory");
const User = require("./user");
const Wishlist = require("./wishlist");
const Comment = require("./comments");
const Review = require("./reviews");
const Cart = require("./cart");
const CartItem = require("./cartItems");
const Order = require("./order");
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

User.hasMany(Comment);
Comment.belongsTo(User);

Product.hasMany(Comment);
Comment.belongsTo(Product);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(CartItem);
CartItem.belongsTo(Order);



sequelize
  .sync({
    alter: true,
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
  Comment,
  Review,
  Cart,
  CartItem,
};
