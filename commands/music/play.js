const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json');

module.exports = {
    config: {
        name: "play",
        group: "music",
        aliases: ["p"],
        category: "music",
        description: "Plays music in a voice channel",
        usage: "<name>",
        accessableby: ""
    },
    run: async ( client, message, args) => {
	const embednoinvoice = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - You're not in a voice channel !`)
    
    .setColor(embedcolor)
	.setTimestamp();
	const embedspecify = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - Please indicate the title of a song !`)
    
    .setColor(embedcolor)
	.setTimestamp();
    if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

    if (!args[0]) return message.channel.send(embedspecify);

    client.player.play(message, args.join(" "))
    }
};