const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json');

module.exports = {
    config: {
        name: "pause",
        group: "music",
        aliases: [],
        category: "music",
        description: "Pauses the current music",
        usage: "",
        accessableby: ""
    },
    run: async (client, message, args) => {
	const embednoinvoice = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - You're not in a voice channel !`)
    
    .setColor(embedcolor)
	.setTimestamp();
	const embednomusic = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - No music currently playing !`)
    
    .setColor(embedcolor)
	.setTimestamp();
	const embedpaused = new Discord.MessageEmbed()
	.setTitle('Paused!')
	.setDescription(`${client.emotes.success} - Song ${client.player.getQueue(message).playing.title} **paused** !`)
    
    .setColor(embedcolor)
	.setTimestamp();
    if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

    if (!client.player.getQueue(message)) return message.channel.send(embednomusic);

    client.player.pause(message);

    message.channel.send(embedpaused);
    }
};