const { User } = require("../models/user");
const {
  ResourceNotFoundError,
  ConflictError,
} = require("../errors/CustomErrors");

async function createUser({ firstName, lastName, username, telegramUserId }) {
  // Check if the telegramUserId is already taken

  console.log("req.body" + telegramUserId);
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
    role: "user",
  });

  return user;
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
