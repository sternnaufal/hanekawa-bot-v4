require('dotenv').config();
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

(async () => {
    try {
        console.log('Mengambil info bot...');
        const user = await rest.get(Routes.user());
        const clientId = user.id;

        console.log('Mengambil daftar guild...');
        const guilds = await rest.get(Routes.userGuilds());

        console.log(`Ditemukan ${guilds.length} guild. Membersihkan command per guild...`);
        
        for (const guild of guilds) {
            console.log(`Membersihkan command di guild: ${guild.name} (${guild.id})...`);
            await rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: [] });
        }
        
        console.log('\n✅ BERHASIL: Semua guild command telah dihapus.');
        console.log('Sekarang bot hanya akan menggunakan command GLOBAL.');
        console.log('Harap tunggu 1-60 menit agar Discord memperbarui menu / di semua server.');
    } catch (error) {
        console.error('❌ Terjadi kesalahan:', error);
    }
})();
