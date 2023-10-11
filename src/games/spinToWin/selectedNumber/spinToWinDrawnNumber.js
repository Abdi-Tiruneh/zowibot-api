const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/database");

// Define the SpinToWinDrawnNumber model
class SpinToWinDrawnNumber extends Model {}

SpinToWinDrawnNumber.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Ensure each number is unique in the database
    },
    playerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SpinToWinDrawnNumber",
    paranoid: true,
  }
);

module.exports = SpinToWinDrawnNumber;
