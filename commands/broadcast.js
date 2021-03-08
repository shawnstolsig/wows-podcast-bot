const Discord = require('discord.js');
const logo = new Discord.MessageAttachment('./assets/logo.jpeg');

exports.run = async (client, message, args, level) => {

    const prompts = [
        "Episode title?",
        "Episode description?",
        "Youtube link?",
        "Anchor.fm link?",
        "Send?"
    ];

    const aborts = ['stop', 'abort', 'no', 'cancel'];

    let episodeTitle = 'Episode title';
    let episodeDescription = 'Episode description';
    let youtubeLink = 'https://www.youtube.com/channel/UC8epf9u0MUiB5dxDBR5mbeg';
    let anchorLink = 'https://anchor.fm/gtkwows/';

    const filter = response => response;

    await message.channel.send(prompts[0]);
    const collectedEpisodeTitle = await message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']});
    episodeTitle = collectedEpisodeTitle.first().content;
    if(aborts.includes(episodeTitle)) {
        await message.channel.send('Aborting.')
        return
    }

    await message.channel.send(prompts[1]);
    const collectedEpisodeDescription = await message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']});
    episodeDescription = collectedEpisodeDescription.first().content;
    if(aborts.includes(episodeDescription)) {
        await message.channel.send('Aborting.')
        return
    }

    await message.channel.send(prompts[2]);
    const collectedYoutubeLink = await message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']});
    youtubeLink = collectedYoutubeLink.first().content;
    if(aborts.includes(youtubeLink)) {
        await message.channel.send('Aborting.')
        return
    }
    if(youtubeLink.slice(0,4) !== 'http') {
        await message.channel.send(`Please use full URL, including "http".  Aborting.`)
        return
    }

    await message.channel.send(prompts[3]);
    const collectedAnchorLink = await message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']});
    anchorLink = collectedAnchorLink.first().content;
    if(aborts.includes(anchorLink)) {
        await message.channel.send('Aborting.')
        return
    }
    if(anchorLink.slice(0,4) !== 'http') {
        await message.channel.send(`Please use full URL, including "http".  Aborting.`)
        return
    }

    const exampleEmbed = {
        color: 'c60003',
        title: 'Get to Know World of Warships Podcast',
        url: 'https://anchor.fm/gtkwows/',
        description: 'New episode announcement!',
        fields: [
            {
                name: episodeTitle,
                value: episodeDescription,
            },
            {
                name: 'Youtube',
                value: `[link](${youtubeLink} '${youtubeLink}')`,
                inline: true,
            },
            {
                name: 'Anchor.fm',
                value: `[link](${anchorLink} '${anchorLink}')`,
                inline: true,
            },
        ],
        image: {
            url: 'attachment://logo.jpeg',
        },
        timestamp: new Date(),
    };

    await message.channel.send({files: [logo], embed: exampleEmbed});
    await message.channel.send(prompts[4]);
    const collectedConfirmation = await message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']});

    const confirmation = collectedConfirmation.first().content;

    if(['no', 'No', 'NO', 'n', 'cancel', 'clear','abort'].includes(confirmation)){
        await message.channel.send(`Aborting.`);
        return
    }

    await message.channel.send(`Sending!`);
    // TODO: code for sending embed

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Support"
};

exports.help = {
    name: "broadcast",
    category: "Broadcasting",
    description: "Starts the sequence for sending a broadcast.",
    usage: "broadcast"
};
