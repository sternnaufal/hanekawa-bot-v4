# <samp>Hanekawa Bot</samp> v4.0.0 🐱

A powerful, multi-purpose Discord bot named after **Hanekawa Tsubasa** from the Monogatari series. Smart, helpful, and polite.

---

## ✨ Features

### 🧠 AI Integration (Gemini & DeepSeek)
- **Smart Conversations**: Interact with Hanekawa using Google's **Gemini 1.5 Flash**.
- **Robust Reliability**: Automatic fallback to **DeepSeek Chat** if Gemini hits rate limits.
- **Character Personality**: Hanekawa answers in her signature style — smart, humble, and polite.

### 📚 Information & Utility
- **Wikipedia Indonesia**: Search for explanations directly from Wikipedia ID.
- **MyAnimeList Search**: Get detailed information about any anime.
- **Server & User Info**: Beautifully formatted embeds for guild and member details.
- **Message Management**: Efficient `clear` command to keep channels clean.

### 🏗️ Advanced Handler Structure
- **Slash Commands**: Fully supports modern Discord application commands.
- **Message Commands**: Classic prefix-based commands (`h?`) for convenience.
- **Component Handling**: Native support for Buttons, Select Menus, Modals, and Autocomplete.
- **Event Driven**: Organized event listener system.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or newer.
- Discord Bot Token from [Discord Developer Portal](https://discord.com/developers/applications).
- API Keys for Gemini (Google AI Studio) and DeepSeek (optional but recommended for fallback).

### Installation

1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configuration:
   - Rename `src/example.config.js` to `src/config.js` and fill in your Guild ID and Owner ID.
   - Rename `.env.example` to `.env` and add your tokens:
     ```env
     CLIENT_TOKEN="YOUR_BOT_TOKEN"
     GEMINI_API_KEY="YOUR_GEMINI_KEY"
     DEEPSEEK_API_KEY="YOUR_DEEPSEEK_KEY"
     ```
4. Run the bot:
   ```bash
   npm start
   ```

---

## 🛠️ Tech Stack
- **Library**: [discord.js v14](https://discord.js.org/)
- **AI Engine**: Google Generative AI & DeepSeek API
- **Data Fetching**: Axios
- **Database**: Quick-YAML (Simple & Fast)

---

## 📝 Commands

| Command | Type | Description |
| :--- | :--- | :--- |
| `/ask` | AI | Ask Hanekawa anything (Gemini/DeepSeek) |
| `/wikipedia` | Info | Search Wikipedia Indonesia |
| `/anime` | Info | Search anime on MyAnimeList |
| `/clear` | Utility | Bulk delete messages |
| `/serverinfo` | Info | Display server information |
| `/help` | Info | Show list of available commands |

---

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License
This project is licensed under the [GPL-3.0](./LICENSE) license.

---

> "Aku tidak tahu segalanya, aku hanya tahu apa yang aku tahu." — **Hanekawa Tsubasa**