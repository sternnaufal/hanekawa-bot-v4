const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

const emojis = ['7️⃣', '🔔', '🍎', '🍊', '🍇', '🍒', '🍋'];

module.exports = new ApplicationCommand({
    command: {
        name: 'slot',
        description: 'Mainkan mesin slot Hanekawa (Hanya untuk seru-seruan!).',
        type: ApplicationCommandType.ChatInput
    },
    run: async (client, interaction) => {
        // Acak 3 slot
        const slot1 = emojis[Math.floor(Math.random() * emojis.length)];
        const slot2 = emojis[Math.floor(Math.random() * emojis.length)];
        const slot3 = emojis[Math.floor(Math.random() * emojis.length)];

        const result = `[ ${slot1} | ${slot2} | ${slot3} ]`;
        
        let status = '❌ Kamu Kalah!';
        let color = '#ff4d4d'; // Merah
        let description = 'Sayang sekali, coba lagi ya!';

        // Logika Menang
        if (slot1 === slot2 && slot2 === slot3) {
            status = '🎉 JACKPOT!';
            color = '#ffd700'; // Emas
            description = `Luar biasa! Kamu mendapatkan tiga **${slot1}**!`;
            
            if (slot1 === '7️⃣') {
                status = '🌟 SUPER JACKPOT 777! 🌟';
                description = 'KEBERUNTUNGAN DEWA! Kamu mendapatkan triple 7!';
            }
        } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
            status = '✨ Menang Tipis!';
            color = '#4caf50'; // Hijau
            description = 'Lumayan, ada dua yang sama!';
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Hanekawa Slot Machine', iconURL: client.user.displayAvatarURL() })
            .setTitle(status)
            .setDescription(`**${result}**\n\n${description}`)
            .setColor(color)
            .setFooter({ text: `Pemain: ${interaction.user.username}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}).toJSON();
