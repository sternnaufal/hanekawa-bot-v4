const { ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
    command: {
        name: 'reload',
        description: 'Memuat ulang semua command, component, dan event.',
        type: ApplicationCommandType.ChatInput
    },
    options: {
        botDevelopers: true // Hanya developer yang bisa pakai
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        try {
            client.commands_handler.reload();
            client.components_handler.reload();
            client.events_handler.reload();

            await interaction.editReply('✅ Berhasil memuat ulang semua modul!');
        } catch (error) {
            console.error(error);
            await interaction.editReply('❌ Terjadi kesalahan saat memuat ulang modul.');
        }
    }
}).toJSON();
