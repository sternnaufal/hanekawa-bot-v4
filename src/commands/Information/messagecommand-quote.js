const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

const quotes = [
    { text: "Aku tidak tahu segalanya, aku hanya tahu apa yang aku tahu.", author: "Hanekawa Tsubasa" },
    { text: "Orang-orang harus menyelamatkan diri mereka sendiri. Tidak ada orang yang bisa menyelamatkan orang lain.", author: "Oshino Meme" },
    { text: "Berbohong itu tidak selalu buruk. Kadang-kadang kebenaran lebih menyakitkan.", author: "Hanekawa Tsubasa" },
    { text: "Jika kamu ingin menjadi seseorang yang hebat, berhentilah meminta izin.", author: "Anonymous" },
    { text: "Kesalahan adalah bukti bahwa kamu sedang mencoba.", author: "Anonymous" },
    { text: "Kebahagiaan bukan tentang mendapatkan apa yang kita inginkan, tapi tentang mensyukuri apa yang kita miliki.", author: "Anonymous" },
    { text: "Tidak ada gunanya menyesali masa lalu. Yang penting adalah apa yang kita lakukan sekarang.", author: "Hanekawa Tsubasa" }
];

module.exports = new MessageCommand({
    command: {
        name: 'quote',
        description: 'Menampilkan kutipan bijak.',
        aliases: ['q', 'kutipan']
    },
    run: async (client, message, args) => {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        const embed = new EmbedBuilder()
            .setTitle('📜 Kutipan Bijak')
            .setDescription(`*"${quote.text}"*`)
            .setFooter({ text: `— ${quote.author}` })
            .setColor('#f8a5c2')
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
}).toJSON();
