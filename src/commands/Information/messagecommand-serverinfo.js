const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
    command: {
        name: 'serverinfo',
        description: 'Menampilkan informasi detail tentang server ini.'
    },
    run: async (client, message, args) => {
        const { guild } = message;
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
                { name: 'Total Channel', value: `${guild.channels.cache.size}`, inline: true }
            )
            .setFooter({ text: `Requested by ${message.author.username}` })
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
}).toJSON();
