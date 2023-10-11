const { UnauthorizedError } = require("../errors/CustomErrors");
const { getUserByTelegramId } = require("../userManager/userService");

module.exports = async function authenticateByTelegramId(req, _res, next) {
  const telegramUserId = req.header("telegram_user_id");
  if (!telegramUserId)
    throw new UnauthorizedError("No Telegram user ID was provided.");

  try {
    req.user = await getUserByTelegramId(telegramUserId);
    next();
  } catch (ex) {
    throw new UnauthorizedError("Authentication failed: User not found.");
  }
};
