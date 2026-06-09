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
                type: 3,
                required: true
            }
        ]
    },
    run: async (client, interaction) => {
        const query = interaction.options.getString('query');
        await interaction.deferReply();

        try {
            const searchResponse = await axios.get(`https://id.wikipedia.org/w/api.php`, {
                params: {
                    action: 'query',
                    list: 'search',
                    srsearch: query,
                    format: 'json',
                    origin: '*'
                }
            });

            const searchResults = searchResponse.data.query.search;
            if (searchResults.length === 0) {
                return interaction.editReply(`Maaf, aku tidak bisa menemukan artikel tentang "${query}" di Wikipedia.`);
            }

            const pageTitle = searchResults[0].title;

            const summaryResponse = await axios.get(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`);

            const data = summaryResponse.data;

            const embed = new EmbedBuilder()
                .setTitle(data.title)
                .setURL(data.content_urls.desktop.page)
                .setThumbnail(data.thumbnail ? data.thumbnail.source : null)
                .setColor('#ffffff')
                .setDescription(data.extract || 'Tidak ada ringkasan tersedia.')
                .setFooter({ text: 'Sumber: Wikipedia Indonesia' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Wikipedia Error:', error.message);
            await interaction.editReply('Terjadi kesalahan saat menghubungi Wikipedia. Pastikan kata kunci yang kamu masukkan benar.');
        }
    }
}).toJSON();
