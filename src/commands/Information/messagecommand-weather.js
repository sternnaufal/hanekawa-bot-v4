const { EmbedBuilder } = require('discord.js');
const MessageCommand = require('../../structure/MessageCommand');
const axios = require('axios');

module.exports = new MessageCommand({
    command: {
        name: 'weather',
        description: 'Cek kondisi cuaca.',
        aliases: ['cuaca']
    },
    run: async (client, message, args) => {
        const city = args.join(' ');
        if (!city) return message.reply('Tolong berikan nama kota.');

        try {
            const response = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
            const data = response.data;
            const current = data.current_condition[0];
            const area = data.nearest_area[0];

            const embed = new EmbedBuilder()
                .setTitle(`🌦️ Cuaca di ${area.areaName[0].value}`)
                .addFields(
                    { name: 'Suhu', value: `${current.temp_C}°C`, inline: true },
                    { name: 'Kondisi', value: current.weatherDesc[0].value, inline: true }
                )
                .setColor('#00bfff');

            await message.reply({ embeds: [embed] });
        } catch (error) {
            message.reply('Gagal mengambil data cuaca.');
        }
    }
}).toJSON();
