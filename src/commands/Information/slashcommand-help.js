const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'help',
        description: 'Replies with a list of available application commands.',
        type: 1,
        options: []
    },
    options: {
        cooldown: 10000
    },
    run: async (client, interaction) => {
        await interaction.reply({
            content: `${client.collection.application_commands.map((cmd) => '\`/' + cmd.command.name + '\`').join(', ')}`
        });
    }
}).toJSON();
