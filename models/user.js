const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

// Define role enum
const UserRoleEnum = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
};

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure uniqueness
      validate: {
        isEmail: true, // Validate email format
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure uniqueness
      validate: {
        isAlphanumeric: true, // Validate alphanumeric characters only
        len: [4, 20], // Validate length between 4 and 20 characters
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // Validate password length
      },
    },
    phone: {
      type: DataTypes.STRING, // Changed to STRING to support phone numbers with non-numeric characters
      validate: {
        is: /^\+(?:[0-9] ?){6,14}[0-9]$/, // Validate international phone number format
      },
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue:
        "http://res.cloudinary.com/dowfl0pfi/image/upload/v1708002827/1708002826715.png",
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRoleEnum)), // Use ENUM for role with predefined values
      allowNull: false,
    },
  },
  {
    // Hooks to ensure role is always set
    hooks: {
      beforeValidate: (user) => {
        if (!user.role) {
          user.role = UserRoleEnum.USER; // Default role to USER if not provided
        }
      },
    },
  }
);

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
});

module.exports = User;
