const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = new MessageCommand({
    command: {
        name: 'curhat',
        description: 'Sesi curhat dengan Hanekawa.'
    },
    run: async (client, message, args) => {
        const story = args.join(' ');
        if (!story) return message.reply('Ceritakan sesuatu padaku agar aku bisa mendengarkan. Contoh: `h?curhat Aku sedang sedih...`');

        const hanekawaContext = `Kamu adalah Hanekawa Tsubasa. Kamu adalah pendengar yang sangat baik, tenang, dan bijaksana. 
        Seseorang sedang curhat kepadamu. Berikan tanggapan yang menenangkan, empati, dan berikan saran yang bijak khas Hanekawa. 
        Gunakan bahasa yang lembut dan sopan.`;

        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const result = await model.generateContent(`${hanekawaContext}\n\nCerita user: ${story}`);
            const response = await result.response;
            const text = response.text();

            const embed = new EmbedBuilder()
                .setAuthor({ name: 'Hanekawa Tsubasa', iconURL: client.user.displayAvatarURL() })
                .setTitle('🌙 Sesi Curhat')
                .setDescription(text.length > 4000 ? text.substring(0, 3997) + '...' : text)
                .setColor('#6a5acd')
                .setFooter({ text: 'Aku selalu di sini untuk mendengarkan.' });

            await message.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('Maaf, sepertinya aku sedang tidak bisa fokus mendengarkan. Bisa coba lagi nanti?');
        }
    }
}).toJSON();
