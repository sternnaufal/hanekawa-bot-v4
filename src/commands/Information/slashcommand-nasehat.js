const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');

const advices = [
    "Jangan memaksakan diri, istirahat itu juga bagian dari perjuangan.",
    "Banyak hal yang tidak kita ketahui, tapi bukan berarti kita tidak bisa mempelajarinya.",
    "Minta tolong bukanlah tanda kelemahan, melainkan tanda bahwa kamu ingin menjadi lebih kuat.",
    "Kebahagiaan yang paling murni adalah saat kita bisa memberikan manfaat bagi orang lain.",
    "Ingatlah, kamu tidak sendirian. Ada banyak orang yang peduli padamu, termasuk aku.",
    "Kadang, diam adalah jawaban yang paling bijaksana.",
    "Jujurlah pada dirimu sendiri, karena kebohongan yang paling berbahaya adalah yang kita katakan pada diri kita sendiri."
];

module.exports = new ApplicationCommand({
    command: {
        name: 'nasehat',
        description: 'Hanekawa akan memberikan nasehat bijak untukmu.',
        type: ApplicationCommandType.ChatInput
    },
    run: async (client, interaction) => {
        const advice = advices[Math.floor(Math.random() * advices.length)];

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Hanekawa\'s Corner', iconURL: client.user.displayAvatarURL() })
            .setTitle('🍂 Nasehat Bijak')
            .setDescription(`*"${advice}"*`)
            .setColor('#deb887') // BurlyWood
            .setFooter({ text: 'Semoga hari ini menyenangkan untukmu.' });

        await interaction.reply({ embeds: [embed] });
    }
}).toJSON();
