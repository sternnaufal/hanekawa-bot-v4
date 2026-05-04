const MessageCommand = require('../../structure/MessageCommand');
const config = require('../../config');

module.exports = new MessageCommand({
    command: {
        name: 'reload',
        description: 'Memuat ulang semua kode bot dan meregistrasi ulang slash commands.'
    },
    options: {
        botDevelopers: true
    },
    run: async (client, message, args) => {
        try {
            client.commands_handler.reload();
            client.components_handler.reload();
            client.events_handler.reload();

            await client.commands_handler.registerApplicationCommands(config.development);

            await message.reply('✅ Berhasil memuat ulang kode dan meregistrasi ulang slash commands ke Discord!');
        } catch (error) {
            console.error(error);
            await message.reply('❌ Terjadi kesalahan saat memuat ulang modul.');
        }
    }
}).toJSON();
