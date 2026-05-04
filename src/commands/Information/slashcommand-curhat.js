const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = new ApplicationCommand({
    command: {
        name: 'curhat',
        description: 'Ceritakan masalahmu, Hanekawa akan mendengarkan dan memberi saran bijak.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'cerita',
                description: 'Apa yang sedang kamu rasakan atau alami?',
                type: 3,
                required: true
            }
        ]
    },
    run: async (client, interaction) => {
        const story = interaction.options.getString('cerita');
        await interaction.deferReply();

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
                .setColor('#6a5acd') // SlateBlue
                .setFooter({ text: 'Aku selalu di sini untuk mendengarkan.' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('Maaf, sepertinya aku sedang tidak bisa fokus mendengarkan. Bisa coba lagi nanti?');
        }
    }
}).toJSON();
