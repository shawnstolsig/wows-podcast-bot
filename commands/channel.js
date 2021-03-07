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
            // find the correct channel
            for(const key in textChannels){
                if(textChannels[key] === inputChannelName){
                    // store channel in broadcast channel as object containing both name and id
                    client.broadcastChannels.set(message.guild.id, {
                        id: key,
                        name: textChannels[key]
                    });
                    await message.reply(` successfully added **${inputChannelName}** for **${message.guild.name}**.`)
                }
            }
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
