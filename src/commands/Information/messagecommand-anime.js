const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');
const axios = require('axios');

module.exports = new MessageCommand({
    command: {
        name: 'anime',
        description: 'Mencari informasi anime dari MyAnimeList.'
    },
    run: async (client, message, args) => {
        const query = args.join(' ');
        if (!query) return message.reply('Tolong berikan judul anime yang ingin dicari. Contoh: `h?anime naruto`');

        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`);
            const anime = response.data.data[0];

            if (!anime) {
                return message.reply(`Maaf, aku tidak bisa menemukan anime dengan judul "${query}".`);
            }

            const embed = new EmbedBuilder()
                .setTitle(anime.title)
                .setURL(anime.url)
                .setThumbnail(anime.images.jpg.image_url)
                .setColor('#2e51a2')
                .addFields(
                    { name: 'Tipe', value: anime.type || 'N/A', inline: true },
                    { name: 'Episode', value: `${anime.episodes || 'N/A'}`, inline: true },
                    { name: 'Score', value: `⭐ ${anime.score || 'N/A'}`, inline: true }
                )
                .setDescription(anime.synopsis ? (anime.synopsis.substring(0, 300) + '...') : 'Tidak ada sinopsis.')
                .setFooter({ text: 'Data dari MyAnimeList' });

            await message.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('Terjadi kesalahan saat mencari anime tersebut.');
        }
    }
}).toJSON();
