const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderItem = sequelize.define("OrderItem", {
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

OrderItem.belongsTo(sequelize.models.Product, {
  foreignKey: "ProductId",
  targetKey: "id",
});




module.exports = OrderItem;
