const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
    command: {
        name: 'tebakangka',
        description: 'Bermain tebak angka 1-100 bersama Hanekawa.',
        type: ApplicationCommandType.ChatInput
    },
    run: async (client, interaction) => {
        const targetNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;
        const maxAttempts = 10;

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Hanekawa Game Center', iconURL: client.user.displayAvatarURL() })
            .setTitle('🎲 Tebak Angka')
            .setDescription('Aku sudah memikirkan sebuah angka antara **1 sampai 100**. Bisakah kamu menebaknya dalam **10 kali percobaan**?\n\nSilakan ketik angkanya di chat sekarang!')
            .setColor('#f8a5c2')
            .setFooter({ text: 'Aku akan menunggu jawabanmu...' });

        await interaction.reply({ embeds: [embed] });

        const filter = m => m.author.id === interaction.user.id && !isNaN(m.content);
        const collector = interaction.channel.createMessageCollector({ filter, time: 60000 });

        collector.on('collect', async m => {
            attempts++;
            const guess = parseInt(m.content);

            if (guess === targetNumber) {
                collector.stop('win');
                await m.reply(`🎉 **Luar biasa!** Kamu benar! Angka yang aku pikirkan adalah **${targetNumber}**. Kamu berhasil menebaknya dalam **${attempts}** percobaan.`);
            } else if (attempts >= maxAttempts) {
                collector.stop('lose');
                await m.reply(`😔 Sayang sekali, kamu sudah mencoba 10 kali. Angka yang benar adalah **${targetNumber}**. Jangan menyerah ya, coba lagi nanti!`);
            } else {
                const hint = guess < targetNumber ? 'terlalu **KECIL**' : 'terlalu **BESAR**';
                await m.reply(`Angka ${guess} itu ${hint}. Coba lagi! (Sisa percobaan: ${maxAttempts - attempts})`);
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                interaction.followUp('Waktunya habis! Aku pergi dulu ya, kita main lagi kapan-kapan.');
            }
        });
    }
}).toJSON();
