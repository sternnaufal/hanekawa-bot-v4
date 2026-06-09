# Hanekawa Bot v4

A powerful, multi-purpose Discord bot named after **Hanekawa Tsubasa** from the Monogatari series. Built with discord.js v14, featuring AI integration (Gemini & DeepSeek), games, and information commands.

## Features

### AI Integration (Gemini & DeepSeek)
- **Smart Conversations** — Powered by Google's **Gemini 2.5 Flash** with automatic fallback to **DeepSeek Chat**
- **Character Personality** — Answers in Hanekawa's signature style: smart, humble, and polite

### Information & Utility
- **Wikipedia Indonesia** — Search Wikipedia ID for explanations
- **MyAnimeList Search** — Get detailed anime information via Jikan API
- **Server & User Info** — Beautifully formatted embeds for guild and member details
- **Message Management** — Bulk delete messages with `/clear`
- **Weather, KBBI, Facts, Quotes & More**

### Games
- **Wordle** — Guess the word in a Discord channel
- **Sambung Kata** — Chain-word game in dedicated game channels
- **Tebak Angka** — Number guessing game
- **Slot Machine** — Luck-based slot game

### Architecture
- **Slash Commands** — Full Discord application command support
- **Message Commands** — Classic prefix commands (`h?`)
- **Component Handling** — Buttons, Select Menus, Modals, Autocomplete
- **Event System** — Organized event listener architecture
- **Database** — Quick YAML for persistent storage

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0+
- Discord Bot Token from [Discord Developer Portal](https://discord.com/developers/applications)
- API keys for Gemini (Google AI Studio) and DeepSeek (optional but recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hanekawa-bot-v4.git
   cd hanekawa-bot-v4
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment:
   - Copy `.env.example` to `.env` and fill in your tokens:
     ```env
     CLIENT_TOKEN="YOUR_BOT_TOKEN"
     GEMINI_API_KEY="YOUR_GEMINI_KEY"
     DEEPSEEK_API_KEY="YOUR_DEEPSEEK_KEY"
     ```
   - Copy `src/example.config.js` to `src/config.js` and set your Guild ID and Owner ID
4. Run the bot:
   ```bash
   npm start
   ```

### Deploying on Discloud
The included `discloud.config` file is pre-configured for [Discloud](https://discloud.com/) deployment.

## Commands

| Command | Type | Description |
| :--- | :--- | :--- |
| `/ask` | AI | Ask Hanekawa anything (Gemini/DeepSeek) |
| `/wikipedia` | Info | Search Wikipedia Indonesia |
| `/anime` | Info | Search anime on MyAnimeList |
| `/kbbi` | Info | Search KBBI dictionary |
| `/weather` | Info | Check weather in a city |
| `/clear` | Utility | Bulk delete messages |
| `/serverinfo` | Info | Display server information |
| `/userinfo` | Info | Display user information |
| `/help` | Info | Show available commands |
| `/ping` | Utility | Check bot latency |
| `/wordle` | Game | Start a Wordle game |
| `/tebakangka` | Game | Start number guessing game |
| `/slot` | Game | Play the slot machine |

## Tech Stack

- **Library**: [discord.js v14](https://discord.js.org/)
- **AI Engine**: Google Generative AI & DeepSeek API
- **Data Fetching**: Axios
- **Database**: Quick-YAML

## License

Licensed under the [GPL-3.0](./LICENSE) license.

---

> *"Aku tidak tahu segalanya, aku hanya tahu apa yang aku tahu."* — **Hanekawa Tsubasa**
