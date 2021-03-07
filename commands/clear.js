exports.run = async (client, message, args, level) => {
    client.broadcastChannels.clear();
    message.reply(` broadcasting channels cleared.`)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "clear",
    category: "System",
    description: "Clears all broadcast channels.",
    usage: "clear"
};
