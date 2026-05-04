const { PermissionsBitField } = require("discord.js");
const MessageCommand = require("../../structure/MessageCommand");
const config = require("../../config");

module.exports = new MessageCommand({
    command: {
        name: 'setprefix',
        description: 'Mengubah prefix bot untuk server ini.',
        permissions: ['ManageGuild']
    },
    run: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return message.reply('Kamu butuh izin `Manage Server` untuk melakukan ini.');
        }

        const newPrefix = args[0];
        if (!newPrefix) {
            return message.reply(`Gunakan: \`${config.commands.prefix}setprefix [prefix]\`. Contoh: \`${config.commands.prefix}setprefix !\``);
        }

        if (newPrefix.length > 5) {
            return message.reply('Prefix terlalu panjang! Maksimal 5 karakter.');
        }

        if (newPrefix === config.commands.prefix) {
            client.database.delete('prefix-' + message.guild.id);
        } else {
            client.database.set('prefix-' + message.guild.id, newPrefix);
        }

        await message.reply(`✅ Prefix berhasil diubah menjadi \`${newPrefix}\`.`);
    }
}).toJSON();