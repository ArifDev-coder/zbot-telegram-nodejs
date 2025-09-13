const HelpText =
    "Berikut adalah daftar perintah yang tersedia:\n\n!halo - Menyapa bot\n!follow <kata> - Bot akan mengulangi kata yang kamu kirim\n!motivation <english/indonesia> - Mendapatkan kutipan motivasi dalam bahasa inggris atau indonesia\n!news - Mendapatkan berita terbaru dari The Jakarta Post\n!author - Informasi tentang pembuat bot\n!quake - Mendapatkan informasi gempa terkini";

const InvalidCommand = `Mohon maaf, saya tidak mengerti perintah Anda. Ketik !help untuk melihat daftar perintah yang tersedia.`;

const emoji = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🥰",
    "😍",
    "🤩",
    "😸",
    "😺",
    "😻",
    "😹",
    "😽",
    "😼",
    "😎",
    "😏",
    "😋",
    "😜",
];

function randomEmoji() {
    return emoji[Math.floor(Math.random() * emoji.length)];
}

module.exports = { HelpText, InvalidCommand, randomEmoji };
