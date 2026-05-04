const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const axios = require('axios');

module.exports = new ApplicationCommand({
    command: {
        name: 'wikipedia',
        description: 'Mencari penjelasan dari Wikipedia Indonesia.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'query',
                description: 'Apa yang ingin kamu cari di Wikipedia?',
                type: 3, // String
                required: true
            }
        ]
    },
    run: async (client, interaction) => {
        const query = interaction.options.getString('query');
        await interaction.deferReply();

        try {
            // Menggunakan REST API Wikipedia Indonesia
            const response = await axios.get(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, '_'))}`);
            
            if (response.data.type === 'disambiguation' || !response.data.extract) {
                return interaction.editReply(`Hasil pencarian untuk "${query}" terlalu luas atau tidak ditemukan.`);
            }

            const embed = new EmbedBuilder()
                .setTitle(response.data.title)
                .setURL(response.data.content_urls.desktop.page)
                .setThumbnail(response.data.thumbnail ? response.data.thumbnail.source : null)
                .setColor('#ffffff')
                .setDescription(response.data.extract)
                .setFooter({ text: 'Sumber: Wikipedia Indonesia' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return interaction.editReply(`Maaf, aku tidak bisa menemukan artikel tentang "${query}" di Wikipedia.`);
            }
            console.error(error);
            await interaction.editReply('Terjadi kesalahan saat menghubungi Wikipedia.');
        }
    }
}).toJSON();
