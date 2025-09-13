const TelegramBot = require("node-telegram-bot-api");
const commands = require("../libs/commands");
const { HelpText, InvalidCommand, randomEmoji } = require("../libs/response");

class Zbot extends TelegramBot {
    constructor(token, options) {
        super(token, options);

        this.on("message", (data) => {
            // Hanya validasi jika pesan berupa text
            if (!data.text) return;

            const isInCommands = Object.values(commands).some((command) =>
                command.test(data.text)
            );

            if (!isInCommands) {
                console.log(
                    `[LOG ${new Date().toLocaleString()}] Unknown Command Executed By ${
                        data.from.username
                    }`
                );
                this.sendMessage(data.from.id, InvalidCommand, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Panduan Pengguna",
                                    callback_data: "go_to_help",
                                },
                            ],
                        ],
                    },
                });
            }
        });
        this.on("callback_query", (callback) => {
            const callbackName = callback.data;
            if (callbackName === "go_to_help") {
                this.sendMessage(callback.from.id, HelpText);
            }
        });
    }

    getSticker() {
        this.on("sticker", (data) => {
            console.log(
                `[LOG ${new Date().toLocaleString()}] getSticker Executed By ${
                    data.from.username
                }`
            );
            this.sendMessage(data.from.id, data.sticker.emoji);
        });
    }

    getHalo() {
        this.onText(commands.halo, async (data) => {
            console.log(
                `[LOG ${new Date().toLocaleString()}] getHalo Executed By ${
                    data.from.username
                }`
            );
            this.sendMessage(
                data.from.id,
                `Halo juga ${data.from.username}! ${randomEmoji()}`
            );
        });
    }

    getFollow() {
        this.onText(commands.follow, (data, after) => {
            console.log(
                `[LOG ${new Date().toLocaleString()}] getFollow Executed By ${
                    data.from.username
                }`
            );
            this.sendMessage(
                data.from.id,
                `Kata yang kamu kirim adalah: ${after[1]}`
            );
        });
    }

    getMotivation() {
        this.onText(commands.motivation, async (msg, after) => {
            console.log(
                `[LOG ${new Date().toLocaleString()}] getMotivation Executed By ${
                    msg.from.username
                }`
            );
            const wait =
                after[1].toLowerCase() === "english"
                    ? "Please wait..."
                    : "Tunggu sebentar...";
            this.sendMessage(msg.from.id, wait);
            try {
                if (after[1].toLowerCase() === "english") {
                    const quoteEndPoint = "https://zenquotes.io/api/quotes";
                    const apiCall = await fetch(quoteEndPoint);
                    const data = await apiCall.json();
                    const { q, a } = data[0];

                    this.sendMessage(
                        msg.from.id,
                        `Motivation today for you:\n\n"${q}"\n- ${a}`
                    );
                } else if (after[1].toLowerCase() === "indonesia") {
                    const quoteEndPoint =
                        "https://quotes.liupurnomo.com/api/quotes/random?category=motivasi&";
                    const apiCall = await fetch(quoteEndPoint);
                    const { data } = await apiCall.json();
                    const { text, author } = data;

                    this.sendMessage(
                        msg.from.id,
                        `Motivasi hari ini untukmu:\n\n"${text}"\n- ${author}`
                    );
                } else {
                    this.sendMessage(
                        msg.from.id,
                        "Sorry, i don't understand. Please use english or indonesia language. \n\n Maaf, saya tidak mengerti. Silakan gunakan bahasa inggris atau indonesia."
                    );
                }
            } catch (err) {
                console.error(
                    `[ERROR ${new Date().toLocaleString()}] ${
                        err.message
                    }, by ${data.from.username} on getMotivation`
                );
                this.sendMessage(
                    msg.from.id,
                    "Maaf, sedang tejadi masalah :(. Coba lagi nanti."
                );
            }
        });
    }

    getNews() {
        this.onText(commands.news, async (data) => {
            console.log(
                `[LOG ${new Date().toLocaleString()}] getNews Executed By ${
                    data.from.username
                }`
            );
            const newsEndPoint =
                "https://jakpost.vercel.app/api/category/indonesia";

            try {
                const apiCall = await fetch(newsEndPoint);
                const response = await apiCall.json();
                const maxNews = 4;

                for (let i = 0; i < maxNews; i++) {
                    const news = response.posts[i];
                    const { title, image, headline } = await news;

                    await this.sendPhoto(data.from.id, image, {
                        caption: `Judul: ${title}\n\nHeadline: ${headline}`,
                    });
                }
            } catch (err) {
                console.error(
                    `[ERROR ${new Date().toLocaleString()}] ${
                        err.message
                    }, by ${data.from.username} on getNews`
                );
                this.sendMessage(
                    data.from.id,
                    "Maaf, sedang tejadi masalah :(. Coba lagi nanti."
                );
            }
        });
    }

    getAuthor() {
        this.onText(commands.author, (data) => {
            console.log(
                `[LOG ${new Date().toLocaleString()}] getAuthor Executed By ${
                    data.from.username
                }`
            );
            this.sendMessage(
                data.from.id,
                "Bot ini dibuat oleh CEO Zarick Comp. yakni ArifDev."
            );
        });
    }

    getHelp() {
        this.onText(commands.help, (data) => {
            console.error(
                `[LOG ${new Date().toLocaleString()}] getHelp Executed By ${
                    data.from.username
                }`
            );
            this.sendMessage(data.from.id, HelpText);
        });
    }

    getQuake() {
        const quakeEndPoint =
            "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";

        this.onText(commands.quake, async (data) => {
            console.log(
                `[LOG ${new Date().toLocaleString()}] getQuake Executed By ${
                    data.from.username
                }`
            );
            this.sendMessage(data.from.id, "Sedang mengambil info gempa...");
            try {
                const apiCall = await fetch(quakeEndPoint);
                const response = await apiCall.json();
                const { gempa } = response.Infogempa;
                const imageUrl = `https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}`;

                const quakeInfo =
                    `Info Gempa Terkini:\n` +
                    `Tanggal: ${gempa.Tanggal}.\n` +
                    `Jam: ${gempa.Jam}.\n` +
                    `Magnitude: ${gempa.Magnitude} SR.\n` +
                    `Kedalaman: ${gempa.Kedalaman}.\n` +
                    `Lokasi: ${gempa.Wilayah}.\n` +
                    `Koordinat: ${gempa.Coordinates} (${gempa.Lintang}, ${gempa.Bujur}).\n` +
                    `Potensi: ${gempa.Potensi}.\n` +
                    `Dirasakan: ${gempa.Dirasakan}.\n`;

                this.sendPhoto(data.from.id, imageUrl, { caption: quakeInfo });
            } catch (err) {
                console.error(
                    `[ERROR ${new Date().toLocaleString()}] ${
                        err.message
                    }, by ${data.from.username} on getQuake`
                );
                this.sendMessage(
                    data.from.id,
                    "Maaf, sedang tejadi masalah :(. Coba lagi nanti."
                );
            }
        });
    }
}

module.exports = Zbot;
