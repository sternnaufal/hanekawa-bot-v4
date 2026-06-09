const MessageCommand = require("../../structure/MessageCommand");

module.exports = new MessageCommand({
    command: {
        name: 'ping',
        description: 'Replies with Pong!',
        aliases: ['p'],
        permissions: ['SendMessages']
    },
    options: {
        cooldown: 5000
    },
    run: async (client, message, args) => {
        await message.reply({
            content: '**Pong!** ' + client.ws.ping + 'ms'
        });
    }
}).toJSON();
