const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

module.exports = new ApplicationCommand({
    command: {
        name: 'ask',
        description: 'Tanya apa saja kepada Hanekawa (Gemini with DeepSeek Fallback).',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'pertanyaan',
                description: 'Apa yang ingin kamu tanyakan?',
                type: 3, // String
                required: true
            }
        ]
    },
    run: async (client, interaction) => {
        const prompt = interaction.options.getString('pertanyaan');
        await interaction.deferReply();

        const hanekawaContext = `Kamu adalah Hanekawa Tsubasa dari serial Monogatari. Kamu pintar, sopan, dan rendah hati. 
        Ciri khasmu adalah mengatakan 'Aku tidak tahu segalanya, aku hanya tahu apa yang aku tahu' jika ditanya hal sulit. 
        Jawab pertanyaan berikut dengan gaya bicaramu yang khas sebagai Hanekawa.`;

        // 1. Coba menggunakan Gemini
        try {
            if (!process.env.GEMINI_API_KEY) throw new Error('NO_GEMINI_KEY');

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(`${hanekawaContext}\n\nPertanyaan: ${prompt}`);
            const response = await result.response;
            let text = response.text();

            return await sendResponse(client, interaction, text, 'Gemini 2.5');
        } catch (geminiError) {
            console.log('Gemini failed, trying DeepSeek...', geminiError.message);

            // 2. Fallback ke DeepSeek
            try {
                if (!process.env.DEEPSEEK_API_KEY) {
                    throw new Error('DeepSeek API Key tidak ditemukan di .env');
                }

                const deepseekResponse = await axios.post('https://api.deepseek.com/chat/completions', {
                    model: "deepseek-chat",
                    messages: [
                        { role: "system", content: hanekawaContext },
                        { role: "user", content: prompt }
                    ],
                    stream: false
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
                    }
                });

                let text = deepseekResponse.data.choices[0].message.content;
                return await sendResponse(client, interaction, text, 'DeepSeek');

            } catch (deepseekError) {
                console.error('All AI models failed:', deepseekError.message);
                const errorMessage = geminiError.status === 429 
                    ? 'Maaf, kuota pertanyaanku sedang habis di semua jalur. Coba lagi beberapa saat lagi ya...'
                    : 'Aduh, kepalaku tiba-tiba pusing (Error AI). Bisa tanya lagi nanti?';
                
                await interaction.editReply(errorMessage);
            }
        }
    }
}).toJSON();

async function sendResponse(client, interaction, text, provider) {
    if (text.length > 1900) text = text.substring(0, 1900) + '... (bersambung)';

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Hanekawa Tsubasa', iconURL: client.user.displayAvatarURL() })
        .setDescription(text)
        .setColor(provider === 'Gemini 2.5' ? '#3a3a3a' : '#2f3136')
        .setFooter({ text: `Powered by ${provider} | Ditanyakan oleh: ${interaction.user.username}` });

    await interaction.editReply({ embeds: [embed] });
}
