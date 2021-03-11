exports.run = async (client, message, args, level) => {

    // if no arguments, print this server's broadcast channels
    if(args.length === 0){
        const channel = client.broadcastChannels.get(message.guild.id);
        if(!channel) {
            await message.reply(` there are no channels configured for this Discord server.`)
            return
        }
        await message.reply(` currently broadcasting on **${channel.name}**.`)
        return
    }

    // get this discord's text channels, built into an object
    const textChannels = {};
    message.guild.channels.cache.filter(channel => channel.type === 'text')
        .forEach(channel => textChannels[channel.id] = channel.name);

    // iterate through input channel names
    for (const inputChannelName of args) {

        // verify user input valid channel name
        if(Object.values(textChannels).includes(inputChannelName)){

            // store channel info into enmap
            const channelId = Object.keys(textChannels).find(key => textChannels[key] === inputChannelName);
            client.broadcastChannels.set(message.guild.id.toString(), {
                guildId: message.guild.id,
                guildName: message.guild.name,
                channelName: inputChannelName,
                channelId,
            })

            await message.reply(` successfully added **${inputChannelName}** for the **${message.guild.name}** Discord server.`)

        } else {
            await message.reply(` invalid channel name.`)
        }
    }

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
};

exports.help = {
    name: "channel",
    category: "Broadcasting",
    description: "Tells the bot where to broadcast messages.",
    usage: "channel <channel name>"
};
