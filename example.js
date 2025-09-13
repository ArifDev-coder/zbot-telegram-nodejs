const emoji = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "😋",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
];

// Listener untuk semua message masuk
// bot.on("message", async (data) => {
//     if (data.text === "!halo") return;

//     const nameBot = await bot.getMe();
//     bot.sendMessage(
//         data.from.id,
//         `Halo nama saya ${nameBot.first_name},\nAda yang bisa saya bantu?`
//     );
// });

// Spesifik listener untuk command !halo
bot.onText(/^!halo$/, (data) => {
    bot.sendMessage(data.from.id, "Halo juga! 😁");
});

// Spesifik listener untuk command !follow diikuti dengan kata
bot.onText(/^!follow (.+)/, (data, after) => {
    bot.sendMessage(data.from.id, `Kata yang kamu kirim adalah: ${after[1]}`);
});

bot.onText(/^!quote$/, async (data) => {
    // Ambil data quotes dari internet
    try {
        const quoteEndPoint = "https://api.kanye.rest/";
        const apiCall = await fetch(quoteEndPoint);
        const { quote } = await apiCall.json();

        bot.sendMessage(data.from.id, `Quote today for you:\n\n"${quote}"`);
    } catch (err) {
        console.log(err);
        bot.sendMessage(
            data.from.id,
            `Maaf, ada kesalahan: ${err}, mohon coba lagi nanti!`
        );
    }
});

bot.onText(/^!news$/, async (data) => {
    const newsEndPoint = "https://jakpost.vercel.app/api/category/indonesia";

    bot.sendMessage(data.from.id, "Sedang mengambil berita...");
    try {
        const apiCall = await fetch(newsEndPoint);
        const response = await apiCall.json();
        const maxNews = 4;

        for (let i = 0; i < maxNews; i++) {
            const news = response.posts[i];
            const { title, image, headline } = news;

            await bot.sendPhoto(data.from.id, image, {
                caption: `Judul: ${title}\n\nHeadline: ${headline}`,
            });
        }
    } catch (err) {
        console.error(err);
        bot.sendMessage(
            data.from.id,
            `Maaf, ada kesalahan: ${err}, mohon coba lagi nanti!`
        );
    }
});

// Listener untuk message spesifik stiker only
bot.on("sticker", (data) => {
    bot.sendMessage(data.from.id, data.sticker.emoji);
    bot.sendMessage(
        data.from.id,
        emoji[Math.floor(Math.random() * emoji.length)]
    );
});

// Listener untuk error polling
bot.on("polling_error", (err) => {
    bot.sendMessage(err.from.id, `Polling error: ${err}`);
});

const InfoGempa = {
    Infogempa: {
        gempa: {
            Tanggal: "13 Sep 2025",
            Jam: "08:01:11 WIB",
            DateTime: "2025-09-13T01:01:11+00:00",
            Coordinates: "-6.36,104.60",
            Lintang: "6.36 LS",
            Bujur: "104.60 BT",
            Magnitude: "4.4",
            Kedalaman: "23 km",
            Wilayah: "Pusat gempa berada di laut 98 km barat daya Tanggamus",
            Potensi: "Gempa ini dirasakan untuk diteruskan pada masyarakat",
            Dirasakan: "II Ngaras Bengkunat",
            Shakemap: "20250913080111.mmi.jpg",
        },
    },
};
