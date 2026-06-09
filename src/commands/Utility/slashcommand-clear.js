const { ApplicationCommandType, PermissionsBitField, MessageFlags } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
    command: {
        name: 'clear',
        description: 'Menghapus pesan dalam jumlah banyak.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'jumlah',
                description: 'Jumlah pesan yang ingin dihapus (1-100).',
                type: 4,
                required: true,
                min_value: 1,
                max_value: 100
            }
        ]
    },
    run: async (client, interaction) => {
        const amount = interaction.options.getInteger('jumlah');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ 
                content: 'Kamu tidak punya izin `Manage Messages`!', 
                flags: MessageFlags.Ephemeral 
            });
        }

        try {
            const deleted = await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({ 
                content: `Berhasil menghapus ${deleted.size} pesan.`, 
                flags: MessageFlags.Ephemeral 
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: 'Terjadi kesalahan saat mencoba menghapus pesan. (Mungkin pesan sudah lebih dari 14 hari?)', 
                flags: MessageFlags.Ephemeral 
            });
        }
    }
}).toJSON();
