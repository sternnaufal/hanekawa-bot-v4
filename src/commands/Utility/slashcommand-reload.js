const { ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const config = require('../../config');

module.exports = new ApplicationCommand({
    command: {
        name: 'reload',
        description: 'Memuat ulang semua kode bot dan meregistrasi ulang slash commands.',
        type: ApplicationCommandType.ChatInput
    },
    options: {
        botDevelopers: true
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        try {
            // 1. Muat ulang kode internal
            client.commands_handler.reload();
            client.components_handler.reload();
            client.events_handler.reload();

            // 2. Registrasi ulang ke API Discord (untuk update nama/deskripsi command)
            await client.commands_handler.registerApplicationCommands(config.development);

            await interaction.editReply('✅ Berhasil memuat ulang kode dan meregistrasi ulang slash commands ke Discord!\n*Catatan: Update global di server lain mungkin butuh waktu hingga 1 jam.*');
        } catch (error) {
            console.error(error);
            await interaction.editReply('❌ Terjadi kesalahan saat memuat ulang modul.');
        }
    }
}).toJSON();
