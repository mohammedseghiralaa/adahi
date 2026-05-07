const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8791198621:AAH9ihfYYkyqDJAIrEsJYFxbRZJna7vPuOA";
const CHAT_ID = "6426804630";
const bot = new TelegramBot(TOKEN);

const WILAYA = "إن قزام";
let notified = false;

async function check() {
  try {
    const res = await fetch("https://adhahi.dz", {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(15000),
    });
    const text = await res.text();

    if (text.includes(WILAYA)) {
      if (!notified) {
        await bot.sendMessage(CHAT_ID, `✅ ولايتك متاحة: ${WILAYA}`);
        notified = true;
      }
    } else {
      console.log("غير متاح بعد - " + new Date().toLocaleTimeString());
      notified = false;
    }
  } catch (e) {
    console.log("خطأ: " + e.message);
  }
}

setInterval(check, 60000);
check();
