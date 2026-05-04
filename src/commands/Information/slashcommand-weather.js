const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ApplicationCommand = require('../../structure/ApplicationCommand');
const axios = require('axios');

module.exports = new ApplicationCommand({
    command: {
        name: 'weather',
        description: 'Cek kondisi cuaca di kota pilihanmu.',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'kota',
                description: 'Nama kota yang ingin dicek.',
                type: 3,
                required: true
            }
        ]
    },
    run: async (client, interaction) => {
        const city = interaction.options.getString('kota');
        await interaction.deferReply();

        try {
            const response = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
            const data = response.data;
            const current = data.current_condition[0];
            const area = data.nearest_area[0];

            const embed = new EmbedBuilder()
                .setTitle(`🌦️ Cuaca di ${area.areaName[0].value}, ${area.country[0].value}`)
                .setThumbnail('https://cdn-icons-png.flaticon.com/512/1163/1163657.png')
                .addFields(
                    { name: 'Suhu', value: `${current.temp_C}°C`, inline: true },
                    { name: 'Kondisi', value: current.lang_id ? current.lang_id[0].value : current.weatherDesc[0].value, inline: true },
                    { name: 'Kelembaban', value: `${current.humidity}%`, inline: true },
                    { name: 'Kecepatan Angin', value: `${current.windspeedKmph} km/h`, inline: true }
                )
                .setColor('#00bfff')
                .setFooter({ text: 'Jangan lupa bawa payung ya kalau cuaca mendung!' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('Maaf, aku tidak bisa melihat langit dari sini (API Error). Pastikan nama kotanya benar ya.');
        }
    }
}).toJSON();
