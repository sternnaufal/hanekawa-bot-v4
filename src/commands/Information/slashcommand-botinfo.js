const { EmbedBuilder, ApplicationCommandType, version } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
    command: {
        name: 'botinfo',
        description: 'Menampilkan statistik dan informasi tentang Hanekawa Bot.',
        type: ApplicationCommandType.ChatInput
    },
    run: async (client, interaction) => {
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor(uptime / 3600) % 24;
        const minutes = Math.floor(uptime / 60) % 60;
        const seconds = Math.floor(uptime % 60);

        const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Hanekawa Bot Info', iconURL: client.user.displayAvatarURL() })
            .setTitle('Informasi Detail Bot')
            .setDescription(`Halo! Aku Hanekawa Tsubasa, asisten pintar untuk servermu.\n\n**Made by <@1479796000473219186>**`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor('#f8a5c2')
            .addFields(
                { name: '🤖 Nama Bot', value: `${client.user.tag}`, inline: true },
                { name: '🆔 ID Bot', value: `${client.user.id}`, inline: true },
                { name: '📅 Dibuat Pada', value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:F>`, inline: false },
                { name: '📊 Statistik', value: `🏰 **${client.guilds.cache.size}** Server\n👥 **${client.users.cache.size}** Pengguna\n⌨️ **${client.collection.application_commands.size}** Slash Commands`, inline: true },
                { name: '💻 Sistem', value: `📦 **Discord.js**: v${version}\n🟢 **Node.js**: ${process.version}\n💾 **RAM**: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                { name: '⏱️ Uptime', value: `\`${uptimeString}\``, inline: false }
            )
            .setFooter({ text: `Requested by ${interaction.user.username}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}).toJSON();
