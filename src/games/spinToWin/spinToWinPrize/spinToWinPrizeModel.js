const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/database");

// Define the SpinToWinPrize model
class SpinToWinPrize extends Model {}

SpinToWinPrize.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        min: 1,
        max: 50000,
      },
    },
    prize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[100, 500, 1000, 5000, 10000, 50000, 100000, 500000]],
      },
    },
    drawn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "SpinToWinPrize",
    paranoid: true, // Enable soft deletes for data retention
  }
);

module.exports = SpinToWinPrize;
