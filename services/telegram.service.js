require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const send_telegram_msg = async (message) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Bot token or chat ID is missing from environment variables');
    return;
  }

  try {
    const bot = new TelegramBot(token, { polling: false }); 

    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error("Error sending hello message:", error);
  }
};

module.exports = { send_telegram_msg };