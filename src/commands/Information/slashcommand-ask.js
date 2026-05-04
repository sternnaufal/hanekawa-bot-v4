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

        // Ditambahkan instruksi batasan kata di context
        const hanekawaContext = `Kamu adalah Hanekawa Tsubasa dari serial Monogatari. Kamu pintar, sopan, dan rendah hati. 
        Ciri khasmu adalah mengatakan 'Aku tidak tahu segalanya, aku hanya tahu apa yang aku tahu' jika ditanya hal sulit. 
        Jawab pertanyaan berikut dengan gaya bicaramu yang khas sebagai Hanekawa.
        PENTING: Berikan jawaban yang ringkas, padat, dan tidak terlalu panjang (maksimal sekitar 150-200 kata).`;

        // 1. Coba menggunakan Gemini
        try {
            if (!process.env.GEMINI_API_KEY) throw new Error('NO_GEMINI_KEY');

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
                generationConfig: {
                    maxOutputTokens: 500, // Membatasi output tokens (sekitar 300-400 kata)
                }
            });

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
                    max_tokens: 500, // Membatasi output tokens di DeepSeek
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
                
                let errorMessage = 'Aduh, kepalaku tiba-tiba pusing. Bisa tanya lagi nanti?';
                
                if (geminiError.message.includes('429')) {
                    errorMessage = 'Maaf, kuota pertanyaanku sedang habis di semua jalur. Coba lagi beberapa saat lagi ya...';
                } else if (deepseekError.message.includes('402')) {
                    errorMessage = 'Maaf, saldo DeepSeek-ku sedang habis dan Gemini juga sedang error. Bisa coba lagi nanti?';
                }
                
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
        .setColor(provider.includes('Gemini') ? '#3a3a3a' : '#2f3136')
        .setFooter({ text: `Powered by ${provider} | Ditanyakan oleh: ${interaction.user.username}` });

    await interaction.editReply({ embeds: [embed] });
}
