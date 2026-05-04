const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
    command: {
        name: 'userinfo',
        description: 'Menampilkan informasi profil user.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'target',
                description: 'User yang ingin dicek profilnya.',
                type: 6, // User type
                required: false
            }
        ]
    },
    run: async (client, interaction) => {
        const user = interaction.options.getUser('target') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setTitle(`Profil ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor('Random')
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Nickname', value: member?.nickname || 'Tidak ada', inline: true },
                { name: 'Akun Dibuat', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: 'Join Server', value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` : 'Bukan member server', inline: true },
                { name: 'Roles', value: member?.roles.cache.filter(r => r.name !== '@everyone').map(r => r.toString()).join(', ') || 'Tidak ada' }
            )
            .setFooter({ text: `Requested by ${interaction.user.username}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}).toJSON();
