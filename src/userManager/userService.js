const { User } = require("./userModel");
const { createWallet } = require("../payment/userWallet/walletService");
const UserWallet = require("../payment/userWallet/walletModel"); // Import your UserWallet model

const {
  ResourceNotFoundError,
  ConflictError,
} = require("../errors/CustomErrors");

async function createUser({ firstName, lastName, username, telegramUserId }) {
  // Check if the telegramUserId is already taken

  const existingUser = await User.findOne({
    where: { telegramUserId },
  });

  if (existingUser) {
    throw new ConflictError("User already exists with Telegram account.");
  }

  // Create the user in the database
  const user = await User.create({
    firstName,
    lastName,
    username,
    telegramUserId,
    role: "admin",
  });

  await createWallet(user);

  // Include the UserWallet model to fetch the associated wallet
  const userWithWallet = await User.findByPk(user.id, {
    include: [UserWallet],
  });

  return userWithWallet;
}

async function getUsers() {
  const users = await User.findAll();
  return users;
}

async function getUserById(id) {
  const user = await User.findByPk(id);

  if (!user) throw new ResourceNotFoundError("User not found");
  return user;
}

async function getUserByTelegramId(telegramUserId) {
  const user = await User.findOne({
    where: { telegramUserId },
    include: [UserWallet], // Include the UserWallet model
  });

  if (!user) throw new ResourceNotFoundError("User not found");
  return user;
}

async function updateUser(user, updatedData) {
  const updatedUser = await user.update(updatedData);

  return updatedUser;
}

async function deleteUser(id) {
  const user = await getUserService(id);
  await user.destroy();
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByTelegramId,
  updateUser,
  deleteUser,
};
