exports.run = async (client, message, args, level) => {
    message.reply(` there are ${client.broadcastChannels.count} broadcast channels: ${JSON.stringify(client.broadcastChannels.array())}`)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "show",
    category: "System",
    description: "Shows all broadcast channels.",
    usage: "show"
};
