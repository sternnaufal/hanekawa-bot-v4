const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const axios = require('axios');

module.exports = new ApplicationCommand({
    command: {
        name: 'anime',
        description: 'Mencari informasi anime dari MyAnimeList.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'query',
                description: 'Judul anime yang ingin dicari.',
                type: 3, // String
                required: true
            }
        ]
    },
    run: async (client, interaction) => {
        const query = interaction.options.getString('query');
        await interaction.deferReply();

        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`);
            const anime = response.data.data[0];

            if (!anime) {
                return interaction.editReply(`Maaf, aku tidak bisa menemukan anime dengan judul "${query}".`);
            }

            const embed = new EmbedBuilder()
                .setTitle(anime.title)
                .setURL(anime.url)
                .setThumbnail(anime.images.jpg.image_url)
                .setColor('#2e51a2')
                .addFields(
                    { name: 'Tipe', value: anime.type || 'N/A', inline: true },
                    { name: 'Episode', value: `${anime.episodes || 'N/A'}`, inline: true },
                    { name: 'Status', value: anime.status || 'N/A', inline: true },
                    { name: 'Score', value: `⭐ ${anime.score || 'N/A'}`, inline: true },
                    { name: 'Rating', value: anime.rating || 'N/A', inline: true },
                    { name: 'Genre', value: anime.genres.map(g => g.name).join(', ') || 'N/A' }
                )
                .setDescription(anime.synopsis ? (anime.synopsis.substring(0, 500) + '...') : 'Tidak ada sinopsis.')
                .setFooter({ text: 'Data dari MyAnimeList via Jikan API' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('Terjadi kesalahan saat mencari anime tersebut.');
        }
    }
}).toJSON();
