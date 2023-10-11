const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");
const Joi = require("joi");

// Define the User model
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [1, 50],
      },
    },
    telegramUserId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "user"]],
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    paranoid: true, // Enable soft deletes for data retention
  }
);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(1).max(100).required(),
    lastName: Joi.string().alphanum().min(1).max(100),
    username: Joi.string().min(1).max(50),
    telegramUserId: Joi.string().max(255).required(),
    phone_number: Joi.string()
      .regex(/^(09|07)\d{8}$/)
      .optional()
      .messages({
        "string.pattern.base":
          'Phone number must be in the format of "09xxxxxxxx," or "07xxxxxxxx,."',
      }),
  });

  return schema.validate(user);
}

module.exports = { User, validateUser };
