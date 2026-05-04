require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("API Key tidak ditemukan di .env!");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Kita coba akses API langsung untuk list models
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        
        console.log("=== DAFTAR MODEL YANG TERSEDIA ===");
        if (data.models) {
            data.models.forEach(m => {
                console.log(`- ${m.name.replace('models/', '')} (Supported: ${m.supportedGenerationMethods.join(', ')})`);
            });
        } else {
            console.log("Tidak ada model yang ditemukan atau API Key bermasalah.");
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Gagal mengambil daftar model:", error);
    }
}

listModels();
