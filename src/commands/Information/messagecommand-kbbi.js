const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');
const axios = require('axios');

module.exports = new MessageCommand({
    command: {
        name: 'kbbi',
        description: 'Mencari definisi kata dalam KBBI.',
        aliases: ['kamus']
    },
    run: async (client, message, args) => {
        const query = args.join(' ');
        if (!query) return message.reply('Tolong berikan kata yang ingin dicari.');

        try {
            const response = await axios.get(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${encodeURIComponent(query)}`);
            const data = response.data;

            if (!data.lema) return message.reply(`Maaf, aku tidak bisa menemukan kata "**${query}**".`);

            const embed = new EmbedBuilder()
                .setTitle(`📖 KBBI: ${data.lema}`)
                .setDescription(data.arti.join('\n'))
                .setColor('#f8a5c2')
                .setFooter({ text: 'Belajar adalah kunci kesuksesan.' });

            await message.reply({ embeds: [embed] });
        } catch (error) {
            message.reply('Sepertinya ada masalah koneksi ke kamus.');
        }
    }
}).toJSON();
