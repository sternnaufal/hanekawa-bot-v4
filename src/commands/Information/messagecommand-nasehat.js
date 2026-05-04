const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

const advices = [
    "Jangan memaksakan diri, istirahat itu juga bagian dari perjuangan.",
    "Banyak hal yang tidak kita ketahui, tapi bukan berarti kita tidak bisa mempelajarinya.",
    "Minta tolong bukanlah tanda kelemahan, melainkan tanda bahwa kamu ingin menjadi lebih kuat.",
    "Kebahagiaan yang paling murni adalah saat kita bisa memberikan manfaat bagi orang lain.",
    "Ingatlah, kamu tidak sendirian. Ada banyak orang yang peduli padamu, termasuk aku.",
    "Kadang, diam adalah jawaban yang paling bijaksana.",
    "Jujurlah pada dirimu sendiri, karena kebohongan yang paling berbahaya adalah yang kita katakan pada diri kita sendiri."
];

module.exports = new MessageCommand({
    command: {
        name: 'nasehat',
        description: 'Hanekawa akan memberikan nasehat bijak.',
        aliases: ['nasehatin', 'bijak']
    },
    run: async (client, message, args) => {
        const advice = advices[Math.floor(Math.random() * advices.length)];
        const embed = new EmbedBuilder()
            .setTitle('🍂 Nasehat Hanekawa')
            .setDescription(`*"${advice}"*`)
            .setColor('#deb887');
        await message.reply({ embeds: [embed] });
    }
}).toJSON();
