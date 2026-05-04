const Event = require("../../structure/Event");

module.exports = new Event({
    event: 'messageCreate',
    run: async (client, message) => {
        if (message.author.bot || !message.guild) return;

        const gameChannelId = client.database.get(`game-channel-${message.guild.id}`);
        if (!gameChannelId || message.channel.id !== gameChannelId) return;

        // Cek jika pesan adalah command (abaikan)
        let prefix = require('../../config').commands.prefix;
        if (client.database.has('prefix-' + message.guild.id)) {
            prefix = client.database.get('prefix-' + message.guild.id);
        }
        if (message.content.startsWith(prefix)) return;

        const words = message.content.trim().split(/\s+/);
        if (words.length > 1) {
            return message.react('❌').then(() => {
                // Optional: message.reply('Hanya boleh satu kata ya!')
            });
        }

        const inputWord = words[0].toLowerCase().replace(/[^a-z]/g, '');
        if (!inputWord) return;

        const lastWord = client.database.get(`game-word-${message.guild.id}`);
        const lastUserId = client.database.get(`game-user-${message.guild.id}`);

        // Aturan: Tidak boleh orang yang sama berturut-turut
        if (lastUserId === message.author.id) {
            return message.reply('Sabar ya, tunggu orang lain dulu!').then(msg => {
                setTimeout(() => {
                    msg.delete().catch(() => {});
                    message.delete().catch(() => {});
                }, 3000);
            });
        }

        if (lastWord) {
            const lastLetter = lastWord.charAt(lastWord.length - 1);
            const firstLetter = inputWord.charAt(0);

            if (firstLetter !== lastLetter) {
                return message.react('❌').then(() => {
                    message.reply(`Kata harus dimulai dengan huruf **${lastLetter.toUpperCase()}**!`).then(msg => {
                        setTimeout(() => {
                            msg.delete().catch(() => {});
                            message.delete().catch(() => {});
                        }, 3000);
                    });
                });
            }
        }

        // Simpan state baru
        client.database.set(`game-word-${message.guild.id}`, inputWord);
        client.database.set(`game-user-${message.guild.id}`, message.author.id);
        message.react('✅');
    }
}).toJSON();
