require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // SDK doesn't have a direct listModels but we can try to see what's available
        // via a simple generateContent call or similar.
        // Actually, let's just try gemini-1.5-flash again but with a different string if needed.
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hi");
        const response = await result.response;
        console.log("Success with gemini-1.5-flash:", response.text());
    } catch (error) {
        console.error("Failed with gemini-1.5-flash:", error.message);
        
        try {
            console.log("Trying gemini-1.5-flash-001...");
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
            const result = await model.generateContent("Hi");
            const response = await result.response;
            console.log("Success with gemini-1.5-flash-001:", response.text());
        } catch (error2) {
            console.error("Failed with gemini-1.5-flash-001:", error2.message);
        }
    }
}

listModels();
