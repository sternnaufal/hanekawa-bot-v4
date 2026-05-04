const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');

const characters = [
    { name: "Araragi Koyomi", desc: "Kamu sangat peduli pada orang lain, bahkan sampai mengabaikan diri sendiri.", color: "#333333" },
    { name: "Senjougahara Hitagi", desc: "Kamu tajam, jujur, dan punya pendirian yang sangat kuat.", color: "#800080" },
    { name: "Hanekawa Tsubasa", desc: "Kamu sangat pintar dan tahu segalanya (atau setidaknya apa yang kamu tahu).", color: "#f8a5c2" },
    { name: "Hachikuji Mayoi", desc: "Kamu ceria, energik, dan suka berpetualang (meskipun sering tersesat).", color: "#00ff00" },
    { name: "Kanbaru Suruga", desc: "Kamu sporty, jujur dengan perasaanmu, dan sangat setia kawan.", color: "#ff4500" },
    { name: "Sengoku Nadeko", desc: "Kamu terlihat pendiam dan lucu, tapi punya sisi lain yang tak terduga.", color: "#ffb6c1" },
    { name: "Oshino Shinobu", desc: "Kamu terlihat tenang dan dewasa, dan sangat menyukai donat!", color: "#ffd700" }
];

module.exports = new MessageCommand({
    command: {
        name: 'character',
        description: 'Cari tahu karakter Monogatari mana yang paling mirip denganmu.',
        aliases: ['char']
    },
    run: async (client, message, args) => {
        const character = characters[Math.floor(Math.random() * characters.length)];

        const embed = new EmbedBuilder()
            .setTitle('🎭 Monogatari Character Match')
            .setDescription(`Hari ini kamu paling mirip dengan:\n\n**${character.name}**\n*${character.desc}*`)
            .setColor(character.color)
            .setFooter({ text: `Requested by ${message.author.username}` })
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
}).toJSON();
