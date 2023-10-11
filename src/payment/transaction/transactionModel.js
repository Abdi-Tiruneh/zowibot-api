const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");
const Joi = require("joi");
const { User } = require("../../userManager/userModel");

// Define the Transaction model
class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 30,
        max: 1000,
      },
    },
    tx_ref: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    reference: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "ETB",
      validate: {
        isIn: ["ETB", "USD"],
      },
    },
    transactionStatus: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
      validate: {
        isIn: {
          args: [["PENDING", "COMPLETED", "FAILED"]],
          msg: "Invalid transactionStatus",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
  }
);

// Define the association with the User model
Transaction.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Transaction, { foreignKey: "userId" });

function validateTransaction(transaction) {
  const schema = Joi.object({
    amount: Joi.number().min(30).max(1000).required(),
  });

  return schema.validate(transaction);
}

module.exports = { Transaction, validateTransaction };
