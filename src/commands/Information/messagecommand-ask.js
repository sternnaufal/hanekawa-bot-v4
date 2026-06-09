const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

module.exports = new MessageCommand({
    command: {
        name: 'ask',
        description: 'Tanya apa saja kepada Hanekawa (Prefix version).',
        aliases: ['tanya']
    },
    run: async (client, message, args) => {
        const prompt = args.join(' ');
        if (!prompt) return message.reply('Tolong berikan pertanyaanmu. Contoh: `h?ask Siapa namamu?`');

        const hanekawaContext = `Kamu adalah Hanekawa Tsubasa dari serial Monogatari. Kamu pintar, sopan, dan rendah hati. 
        Ciri khasmu adalah mengatakan 'Aku tidak tahu segalanya, aku hanya tahu apa yang aku tahu' jika ditanya hal sulit. 
        Jawab pertanyaan berikut dengan gaya bicaramu yang khas sebagai Hanekawa.
        PENTING: Berikan jawaban yang ringkas, padat, dan tidak terlalu panjang (maksimal sekitar 150-200 kata).`;

        try {
            if (!process.env.GEMINI_API_KEY) throw new Error('NO_GEMINI_KEY');
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                generationConfig: { maxOutputTokens: 500 }
            });

            const result = await model.generateContent(`${hanekawaContext}\n\nPertanyaan: ${prompt}`);
            const response = await result.response;
            let text = response.text();

            return await sendResponse(client, message, text, 'Gemini 2.5');
        } catch (geminiError) {
            console.log('Gemini failed, trying DeepSeek...', geminiError.message);
            try {
                if (!process.env.DEEPSEEK_API_KEY) throw new Error('NO_DEEPSEEK_KEY');

                const deepseekResponse = await axios.post('https://api.deepseek.com/chat/completions', {
                    model: "deepseek-chat",
                    messages: [
                        { role: "system", content: hanekawaContext },
                        { role: "user", content: prompt }
                    ],
                    max_tokens: 500
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
                    }
                });
                let text = deepseekResponse.data.choices[0].message.content;
                return await sendResponse(client, message, text, 'DeepSeek');
            } catch (deepseekError) {
                console.error('All AI models failed:', deepseekError.message);
                message.reply('Aduh, kepalaku tiba-tiba pusing. Bisa tanya lagi nanti?');
            }
        }
    }
}).toJSON();

async function sendResponse(client, message, text, provider) {
    if (text.length > 1900) text = text.substring(0, 1900) + '...';
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Hanekawa Tsubasa', iconURL: client.user.displayAvatarURL() })
        .setDescription(text)
        .setColor(provider.includes('Gemini') ? '#3a3a3a' : '#2f3136')
        .setFooter({ text: `Powered by ${provider}` });
    await message.reply({ embeds: [embed] });
}
