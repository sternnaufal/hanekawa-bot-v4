const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');
const axios = require('axios');

module.exports = new MessageCommand({
    command: {
        name: 'wikipedia',
        description: 'Mencari penjelasan dari Wikipedia Indonesia.'
    },
    run: async (client, message, args) => {
        const query = args.join(' ');
        if (!query) return message.reply('Tolong berikan kata kunci yang ingin dicari. Contoh: `h?wikipedia Kucing`');

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
                return message.reply(`Maaf, aku tidak bisa menemukan artikel tentang "${query}" di Wikipedia.`);
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

            await message.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Wikipedia Error:', error.message);
            message.reply('Terjadi kesalahan saat menghubungi Wikipedia. Pastikan kata kunci yang kamu masukkan benar.');
        }
    }
}).toJSON();
