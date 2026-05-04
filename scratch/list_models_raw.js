require('dotenv').config();
const axios = require('axios');

async function checkModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("API Key tidak ditemukan di .env");
        return;
    }

    try {
        console.log("Mengecek daftar model Gemini yang tersedia...");
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        
        console.log("\nModel yang tersedia untuk API Key kamu:");
        response.data.models.forEach(model => {
            console.log(`- ${model.name} (${model.displayName})`);
            console.log(`  Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
        });
    } catch (error) {
        console.error("\nGagal mengambil daftar model:");
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Pesan: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error(`Error: ${error.message}`);
        }
    }
}

checkModels();
