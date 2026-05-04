const { ApplicationCommandType, PermissionsBitField, MessageFlags } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

module.exports = new ApplicationCommand({
    command: {
        name: 'sambungkata',
        description: 'Kelola game sambung kata di server ini.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'setchannel',
                description: 'Setel channel untuk bermain sambung kata.',
                type: 1, // Subcommand
                options: [
                    {
                        name: 'channel',
                        description: 'Channel yang ingin digunakan.',
                        type: 7, // Channel
                        required: true
                    }
                ]
            },
            {
                name: 'status',
                description: 'Lihat status game sambung kata saat ini.',
                type: 1 // Subcommand
            },
            {
                name: 'stop',
                description: 'Hentikan game sambung kata di server ini.',
                type: 1 // Subcommand
            }
        ]
    },
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'setchannel') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
                return interaction.reply({ content: 'Kamu butuh izin `Manage Server` untuk melakukan ini.', flags: MessageFlags.Ephemeral });
            }

            const channel = interaction.options.getChannel('channel');
            client.database.set(`game-channel-${interaction.guild.id}`, channel.id);
            client.database.delete(`game-word-${interaction.guild.id}`);
            client.database.delete(`game-user-${interaction.guild.id}`);

            return interaction.reply(`✅ Channel sambung kata berhasil disetel ke ${channel}. Mulailah dengan mengetik satu kata di sana!`);
        }

        if (subcommand === 'status') {
            const channelId = client.database.get(`game-channel-${interaction.guild.id}`);
            if (!channelId) return interaction.reply('Game sambung kata belum disetel di server ini. Gunakan `/sambungkata setchannel`.');

            const currentWord = client.database.get(`game-word-${interaction.guild.id}`) || 'Belum ada kata.';
            const lastUserId = client.database.get(`game-user-${interaction.guild.id}`);
            const lastUser = lastUserId ? `<@${lastUserId}>` : 'Tidak ada.';

            return interaction.reply({
                embeds: [{
                    title: '🎮 Status Sambung Kata',
                    fields: [
                        { name: 'Channel', value: `<#${channelId}>`, inline: true },
                        { name: 'Kata Terakhir', value: `**${currentWord}**`, inline: true },
                        { name: 'Pemain Terakhir', value: lastUser, inline: true }
                    ],
                    color: 0x00ff00
                }]
            });
        }

        if (subcommand === 'stop') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
                return interaction.reply({ content: 'Kamu butuh izin `Manage Server` untuk melakukan ini.', flags: MessageFlags.Ephemeral });
            }

            client.database.delete(`game-channel-${interaction.guild.id}`);
            client.database.delete(`game-word-${interaction.guild.id}`);
            client.database.delete(`game-user-${interaction.guild.id}`);

            return interaction.reply('🛑 Game sambung kata telah dihentikan di server ini.');
        }
    }
}).toJSON();
