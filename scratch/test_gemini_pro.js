require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hi");
        const response = await result.response;
        console.log("Success with gemini-pro:", response.text());
    } catch (error) {
        console.error("Failed with gemini-pro:", error.message);
    }
}

listModels();
