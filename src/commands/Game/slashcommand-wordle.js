const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

const wordList = [
    'DUNIA', 'KAPAL', 'POHON', 'RUMAH', 'SIANG', 
    'MALAM', 'PUTIH', 'MERAH', 'BUKTI', 'CERIA',
    'BAGUS', 'JALAN', 'KADAR', 'LAMPU', 'MADYA',
    'PANAS', 'RADAR', 'SABUN', 'TANAH', 'WAKTU'
];

module.exports = new ApplicationCommand({
    command: {
        name: 'wordle',
        description: 'Bermain tebak kata 5 huruf (Wordle) bersama Hanekawa.',
        type: ApplicationCommandType.ChatInput
    },
    run: async (client, interaction) => {
        const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
        let attempts = 0;
        const maxAttempts = 6;
        const guesses = [];
        const board = [];

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Hanekawa Wordle', iconURL: client.user.displayAvatarURL() })
            .setTitle('🧩 Wordle Indonesia')
            .setDescription(`Tebak kata **5 huruf** dalam **6 kali percobaan**.\n\nKetik kata 5 huruf di chat sekarang!`)
            .setColor('#f8a5c2')
            .setFooter({ text: 'Gunakan h?stop untuk menyerah.' });

        await interaction.reply({ embeds: [embed] });

        const filter = m => m.author.id === interaction.user.id && m.content.length === 5;
        const collector = interaction.channel.createMessageCollector({ filter, time: 300000 }); // 5 menit

        collector.on('collect', async m => {
            const guess = m.content.toUpperCase();
            
            // Validasi: Harus huruf saja
            if (!/^[A-Z]+$/.test(guess)) {
                return m.reply('Hanya boleh menggunakan huruf ya!').then(msg => setTimeout(() => msg.delete().catch(() => {}), 3000));
            }

            attempts++;
            const resultRow = checkWord(guess, targetWord);
            guesses.push(`${guess} \n${resultRow}`);

            const gameEmbed = new EmbedBuilder()
                .setAuthor({ name: 'Hanekawa Wordle', iconURL: client.user.displayAvatarURL() })
                .setTitle('🧩 Wordle Indonesia')
                .setDescription(guesses.join('\n\n'))
                .setColor('#f8a5c2')
                .setFooter({ text: `Percobaan: ${attempts}/${maxAttempts}` });

            await m.reply({ embeds: [gameEmbed] });

            if (guess === targetWord) {
                collector.stop('win');
                return m.channel.send(`🎉 **Selamat!** Kamu berhasil menebak katanya: **${targetWord}** dalam ${attempts} percobaan!`);
            }

            if (attempts >= maxAttempts) {
                collector.stop('lose');
                return m.channel.send(`😔 Sayang sekali, kamu kehabisan nyawa. Katanya adalah **${targetWord}**.`);
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                interaction.followUp('Waktunya habis! Permainan dihentikan.');
            }
        });
    }
}).toJSON();

function checkWord(guess, target) {
    const result = new Array(5).fill('⬛');
    const targetArr = target.split('');
    const guessArr = guess.split('');

    // Pertama: Cek yang benar posisi (Green)
    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === targetArr[i]) {
            result[i] = '🟩';
            targetArr[i] = null;
            guessArr[i] = null;
        }
    }

    // Kedua: Cek yang ada tapi salah posisi (Yellow)
    for (let i = 0; i < 5; i++) {
        if (guessArr[i] !== null) {
            const index = targetArr.indexOf(guessArr[i]);
            if (index !== -1) {
                result[i] = '🟨';
                targetArr[index] = null;
            }
        }
    }

    return result.join('');
}
