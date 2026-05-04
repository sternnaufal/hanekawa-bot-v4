const { ApplicationCommandType, PermissionsBitField, MessageFlags } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const config = require('../../config');

module.exports = new ApplicationCommand({
    command: {
        name: 'setprefix',
        description: 'Mengubah prefix bot untuk server ini.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'prefix',
                description: 'Prefix baru (maksimal 5 karakter).',
                type: 3, // String
                required: true
            }
        ]
    },
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return interaction.reply({ content: 'Kamu butuh izin `Manage Server` untuk melakukan ini.', flags: MessageFlags.Ephemeral });
        }

        const newPrefix = interaction.options.getString('prefix');

        if (newPrefix.length > 5) {
            return interaction.reply({ content: 'Prefix terlalu panjang! Maksimal 5 karakter.', flags: MessageFlags.Ephemeral });
        }

        if (newPrefix === config.commands.prefix) {
            client.database.delete('prefix-' + interaction.guild.id);
        } else {
            client.database.set('prefix-' + interaction.guild.id, newPrefix);
        }

        await interaction.reply(`✅ Prefix berhasil diubah menjadi \`${newPrefix}\`. Sekarang kamu bisa menggunakan perintah seperti \`${newPrefix}ping\`.`);
    }
}).toJSON();
