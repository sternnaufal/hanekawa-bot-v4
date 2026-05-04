const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');
const axios = require('axios');

module.exports = new MessageCommand({
    command: {
        name: 'faktaunik',
        description: 'Memberikan fakta unik acak (Bahasa Inggris).',
        aliases: ['fakta']
    },
    run: async (client, message, args) => {
        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
            const data = response.data;

            const embed = new EmbedBuilder()
                .setTitle('💡 Fakta Unik')
                .setDescription(data.text)
                .setColor('#ffd700')
                .setFooter({ text: 'Dunia ini penuh dengan hal yang tidak terduga.' });

            await message.reply({ embeds: [embed] });
        } catch (error) {
            message.reply('Gagal mengambil fakta unik.');
        }
    }
}).toJSON();
