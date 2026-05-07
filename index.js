const { chromium } = require("playwright");
const TelegramBot = require("node-telegram-bot-api");

// ضع التوكن الجديد هنا
const TOKEN = "8791198621:AAH9ihfYYkyqDJAIrEsJYFxbRZJna7vPuOA";

// هذا هو Chat ID الصحيح
const CHAT_ID = "6426804630";

const bot = new TelegramBot(TOKEN);

const WILAYA = "إن قزام";

let notified = false;

async function check() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://adhahi.dz");

    const text = await page.textContent("body");

    if (text.includes(WILAYA)) {
      if (!notified) {
        bot.sendMessage(CHAT_ID, "your wilaya is availabe", { WILAYA });
        notified = true;
      }
    } else {
      console.log("غير متاح بعد");
      notified = false;
    }
  } catch (e) {
    console.log(e.message);
  }

  await browser.close();
}

// يفحص كل 60 ثانية
setInterval(check, 30000);

check();
