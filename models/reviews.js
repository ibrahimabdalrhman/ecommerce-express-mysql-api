const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define("Review", {
  title: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  ProductId: {
    type: DataTypes.INTEGER,
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
});

// Define the static method calcAverageRatingsAndQuantity
Review.calcAverageRatingsAndQuantity = async function(productId) {
  const result = await Review.findAll({
    attributes: [
      [sequelize.fn('avg', sequelize.col('rating')), 'avgRatings'],
      [sequelize.fn('count', sequelize.col('*')), 'ratingsQuantity']
    ],
    where: { ProductId: productId },
    raw: true
  });

  if (result.length > 0) {
    await sequelize.models.Product.update(
      {
        ratingsAverage: result[0].avgRatings,
        ratingsQuantity: result[0].ratingsQuantity,
      },
      { where: { id: productId } }
    );
  } else {
    await sequelize.models.Product.update(
      {
        ratingsAverage: 0,
        ratingsQuantity: 0,
      },
      { where: { id: productId } }
    );
  }
};


// Define associations
Review.belongsTo(sequelize.models.Product, {
  foreignKey: "ProductId",
  targetKey: "id",
});
Review.belongsTo(sequelize.models.User, {
  foreignKey: "UserId",
  targetKey: "id",
});

module.exports = Review;
