const { PermissionsBitField } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

module.exports = new MessageCommand({
    command: {
        name: 'clear',
        description: 'Menghapus pesan dalam jumlah banyak.'
    },
    run: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply('Kamu tidak punya izin `Manage Messages`!');
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply('Tolong berikan jumlah pesan yang valid (1-100). Contoh: `h?clear 10`');
        }

        try {
            await message.delete(); // Hapus command message dulu
            const deleted = await message.channel.bulkDelete(amount, true);
            const msg = await message.channel.send(`Berhasil menghapus ${deleted.size} pesan.`);
            
            setTimeout(() => msg.delete(), 3000); // Hapus pesan konfirmasi setelah 3 detik
        } catch (error) {
            console.error(error);
            message.reply('Terjadi kesalahan saat mencoba menghapus pesan.');
        }
    }
}).toJSON();
