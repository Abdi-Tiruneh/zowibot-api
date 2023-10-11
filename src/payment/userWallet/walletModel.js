const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/database");

const { User } = require("../../userManager/userModel");

class Wallet extends Model {}
Wallet.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "BIRR",
    },
  },
  {
    sequelize,
    modelName: "Wallet",
    tableName: "user_wallets",
  }
);

// Define the association between UserWallet and User
Wallet.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasOne(Wallet, { foreignKey: "userId" });

module.exports = Wallet;
