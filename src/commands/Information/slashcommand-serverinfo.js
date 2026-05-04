const { EmbedBuilder, ApplicationCommandType, ChannelType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
    command: {
        name: 'serverinfo',
        description: 'Menampilkan informasi detail tentang server ini.',
        type: ApplicationCommandType.ChatInput
    },
    run: async (client, interaction) => {
        const { guild } = interaction;
        const owner = await guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setTitle(`Informasi Server: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
            .setColor('#f8a5c2')
            .addFields(
                { name: 'Owner', value: `${owner.user.tag}`, inline: true },
                { name: 'ID Server', value: guild.id, inline: true },
                { name: 'Dibuat Pada', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false },
                { name: 'Total Member', value: `${guild.memberCount}`, inline: true },
                { name: 'Boost Level', value: `${guild.premiumTier}`, inline: true },
                { name: 'Total Channel', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Role Count', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Emoji Count', value: `${guild.emojis.cache.size}`, inline: true }
            )
            .setFooter({ text: `Requested by ${interaction.user.username}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}).toJSON();
