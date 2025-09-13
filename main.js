require("dotenv").config();

console.log(`[LOG ${new Date().toLocaleString()}] Starting ZBOT...`);

const Zbot = require("./app/Zbot");

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const options = { polling: true };

const zbot = new Zbot(TOKEN, options);

const main = () => {
    console.log(`[LOG ${new Date().toLocaleString()}] Checking Features...`);

    zbot.getSticker();
    zbot.getHalo();
    zbot.getFollow();
    zbot.getMotivation();
    zbot.getNews();
    zbot.getAuthor();
    zbot.getHelp();
    zbot.getQuake();

    console.log(`[LOG ${new Date().toLocaleString()}] All Features Loaded!`);
};

main();

console.log(`[LOG ${new Date().toLocaleString()}] ZBOT is Ready!`);
console.log(`[LOG ${new Date().toLocaleString()}] ZBOT is Running...`);
