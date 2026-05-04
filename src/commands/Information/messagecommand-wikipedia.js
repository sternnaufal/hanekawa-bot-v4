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
            const response = await axios.get(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, '_'))}`);
            
            if (response.data.type === 'disambiguation' || !response.data.extract) {
                return message.reply(`Hasil pencarian untuk "${query}" terlalu luas atau tidak ditemukan.`);
            }
            
            const embed = new EmbedBuilder()
                .setTitle(response.data.title)
                .setURL(response.data.content_urls.desktop.page)
                .setThumbnail(response.data.thumbnail ? response.data.thumbnail.source : null)
                .setColor('#ffffff')
                .setDescription(response.data.extract)
                .setFooter({ text: 'Sumber: Wikipedia Indonesia' });

            await message.reply({ embeds: [embed] });
        } catch (error) {
            message.reply(`Maaf, aku tidak bisa menemukan artikel tentang "${query}" di Wikipedia.`);
        }
    }
}).toJSON();
