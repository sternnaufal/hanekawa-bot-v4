require('dotenv').config();
const axios = require('axios');

async function checkModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    try {
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const geminiModels = response.data.models.filter(m => m.name.includes('gemini'));
        
        console.log("Model Gemini yang tersedia (20 pertama):");
        geminiModels.slice(0, 20).forEach(model => {
            if (model.supportedGenerationMethods.includes('generateContent')) {
                console.log(`- ${model.name.replace('models/', '')} (${model.displayName})`);
            }
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

checkModels();
