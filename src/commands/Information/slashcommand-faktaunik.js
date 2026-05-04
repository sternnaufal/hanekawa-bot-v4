const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const axios = require('axios');

module.exports = new ApplicationCommand({
    command: {
        name: 'faktaunik',
        description: 'Memberikan fakta unik acak (bahasa inggris).',
        type: ApplicationCommandType.ChatInput
    },
    run: async (client, interaction) => {
        await interaction.deferReply();

        try {
            // Menggunakan API fakta unik (Bahasa Inggris lalu diterjemahkan atau cari yang Indo)
            // Di sini kita pakai API yang simpel dulu
            const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
            const fact = response.data.text;

            const embed = new EmbedBuilder()
                .setTitle('💡 Fakta Unik Hanekawa')
                .setDescription(fact)
                .setColor('#f8a5c2')
                .setFooter({ text: 'Hanekawa tidak tahu segalanya, dia hanya tahu apa yang dia tahu.' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('Maaf, aku sedang tidak bisa memikirkan fakta apa pun saat ini...');
        }
    }
}).toJSON();
