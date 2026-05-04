const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
    command: {
        name: 'tebakangka',
        description: 'Bermain tebak angka bersama Hanekawa.',
        aliases: ['tebak']
    },
    run: async (client, message, args) => {
        const targetNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;
        const maxAttempts = 10;

        const embed = new EmbedBuilder()
            .setTitle('🎲 Tebak Angka')
            .setDescription('Aku sudah memikirkan sebuah angka **1-100**. Bisakah kamu menebaknya dalam **10 kali percobaan**?')
            .setColor('#f8a5c2');

        await message.reply({ embeds: [embed] });

        const filter = m => m.author.id === message.author.id && !isNaN(m.content);
        const collector = message.channel.createMessageCollector({ filter, time: 60000 });

        collector.on('collect', async m => {
            attempts++;
            const guess = parseInt(m.content);

            if (guess === targetNumber) {
                collector.stop('win');
                await m.reply(`🎉 **Benar!** Angkanya adalah **${targetNumber}**. Kamu menang dalam ${attempts} percobaan.`);
            } else if (attempts >= maxAttempts) {
                collector.stop('lose');
                await m.reply(`😔 Kesempatan habis. Angkanya adalah **${targetNumber}**.`);
            } else {
                const hint = guess < targetNumber ? 'terlalu **KECIL**' : 'terlalu **BESAR**';
                await m.reply(`${guess} itu ${hint}. (Sisa: ${maxAttempts - attempts})`);
            }
        });
    }
}).toJSON();
