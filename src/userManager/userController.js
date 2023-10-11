const {
  createUser: createUserService,
  getUsers: getUsersService,
  updateUser: updateUserService,
  deleteUser: deleteUserService,
} = require("./userService");

async function createUser(req, res, _next) {
  const { firstName, lastName, username, telegramUserId } = req.body;
  const user = await createUserService({
    firstName,
    lastName,
    username,
    telegramUserId,
  });
  return res.status(201).json(user);
}

async function getUsers(_req, res, _next) {
  const users = await getUsersService();
  return res.json(users);
}

// Retrieves the authenticated user's profile information.
// Call this function after the auth middleware to get the user's details.
async function me(req, res, _next) {
  return res.json(req.user);
}

async function updateUser(req, res, _next) {
  const user = req.user;
  const { firstName, lastName, username } = req.body;
  const updatedData = { firstName, lastName, username };
  const updatedUser = await updateUserService(req.user, updatedData);

  return res.json(updatedUser);
}

async function deleteUser(req, res, _next) {
  const { id } = req.params;
  await deleteUserService(id);
  return res.sendStatus(204);
}

module.exports = {
  createUser,
  getUsers,
  me,
  updateUser,
  deleteUser,
};
