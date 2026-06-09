const { ApplicationCommandOptionType } = require("discord.js");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'autocomplete',
        description: '[TESTING COMMAND] A command example for Autocomplete interaction.',
        type: 1,
        options: [{
            name: 'option',
            description: 'Select one of the options!',
            type: ApplicationCommandOptionType.String,
            autocomplete: true,
            required: true
        }]
    },
    options: {
        botDevelopers: true
    },
    run: async (client, interaction) => {
        const chosen = interaction.options.getString('option', true);
        await interaction.reply({
            content: `It seems you like **` + chosen + '**.'
        });
    }
}).toJSON();
