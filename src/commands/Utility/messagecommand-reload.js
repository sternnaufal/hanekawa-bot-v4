const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
    command: {
        name: 'reload',
        description: 'Memuat ulang semua command, component, dan event.'
    },
    options: {
        botDevelopers: true
    },
    run: async (client, message, args) => {
        try {
            client.commands_handler.reload();
            client.components_handler.reload();
            client.events_handler.reload();

            await message.reply('✅ Berhasil memuat ulang semua modul!');
        } catch (error) {
            console.error(error);
            await message.reply('❌ Terjadi kesalahan saat memuat ulang modul.');
        }
    }
}).toJSON();
