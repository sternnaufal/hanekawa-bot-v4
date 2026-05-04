const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
    command: {
        name: 'avatar',
        description: 'Menampilkan foto profil user.',
        aliases: ['av', 'pfp']
    },
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        const embed = new EmbedBuilder()
            .setTitle(`Avatar: ${user.username}`)
            .setImage(avatarURL)
            .setColor('#f8a5c2')
            .setFooter({ text: `Requested by ${message.author.username}` });

        await message.reply({ embeds: [embed] });
    }
}).toJSON();
