const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_NAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;