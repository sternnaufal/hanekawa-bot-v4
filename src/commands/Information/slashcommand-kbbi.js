const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const axios = require('axios');

module.exports = new ApplicationCommand({
    command: {
        name: 'kbbi',
        description: 'Mencari definisi kata dalam Kamus Besar Bahasa Indonesia.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'kata',
                description: 'Kata yang ingin dicari definisinya.',
                type: 3,
                required: true
            }
        ]
    },
    run: async (client, interaction) => {
        const query = interaction.options.getString('kata');
        await interaction.deferReply();

        try {
            const response = await axios.get(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${encodeURIComponent(query)}`);
            const data = response.data;

            if (!data.lema) {
                return interaction.editReply(`Maaf, aku tidak bisa menemukan kata "**${query}**" di kamus. Mungkin ada kesalahan ketik?`);
            }

            const embed = new EmbedBuilder()
                .setTitle(`📖 KBBI: ${data.lema}`)
                .setDescription(data.arti.join('\n'))
                .setColor('#f8a5c2')
                .setFooter({ text: 'Aku senang bisa membantumu belajar hal baru.' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('Sepertinya rak bukuku sedang berantakan (API Error). Bisa coba lagi nanti?');
        }
    }
}).toJSON();
