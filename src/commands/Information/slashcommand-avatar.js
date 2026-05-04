const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
    command: {
        name: 'avatar',
        description: 'Menampilkan foto profil user dalam ukuran penuh.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'user',
                description: 'User yang ingin dilihat fotonya.',
                type: 6, // USER
                required: false
            }
        ]
    },
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        const embed = new EmbedBuilder()
            .setTitle(`Avatar: ${user.username}`)
            .setImage(avatarURL)
            .setColor('#f8a5c2')
            .setFooter({ text: `Requested by ${interaction.user.username}` });

        await interaction.reply({ embeds: [embed] });
    }
}).toJSON();
