require('dotenv').config();
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

(async () => {
    try {
        console.log('Mengambil info bot...');
        const user = await rest.get(Routes.user());
        const clientId = user.id;
        const guildId = '1500708784513880226'; // ID Guild kamu

        console.log(`Menghapus semua command di guild: ${guildId}...`);
        
        // Mengosongkan command di guild tertentu
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
        
        console.log('✅ Berhasil menghapus semua command di guild tersebut.');
        console.log('Sekarang bot hanya akan menggunakan command global.');
    } catch (error) {
        console.error('❌ Terjadi kesalahan:', error);
    }
})();
