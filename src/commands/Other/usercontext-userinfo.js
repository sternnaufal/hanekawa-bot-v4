const { MessageFlags } = require("discord.js");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'User Information',
        type: 2,
    },
    options: {
        cooldown: 5000
    },
    run: async (client, interaction) => {
        const target = interaction.targetMember;

        if (!target) {
            await interaction.reply({ content: `Invalid target!` });
            return;
        }

        const array = [
            `**Displayname:** ${target.user.displayName}`,
            `**Bot?** ${target.user.bot ? 'Yes' : 'No'}`,
            `**Guild Owner?** ${target.user.id == target.guild.ownerId ? 'Yes' : 'No'}`,
        ];

        await interaction.reply({ content: array.join('\n'), flags: MessageFlags.Ephemeral });
    }
}).toJSON();
