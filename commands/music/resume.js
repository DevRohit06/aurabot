const Discord = require("discord.js");
const { embedcolor } = require('../../configs/config.json');

module.exports = {
    config: {
        name: "resume",
        group: "music",
        aliases: [],
        category: "music",
        description: "Puts the current music back on",
        usage: "",
        accessableby: ""
    },
    run: async (client, message, args) => {
	const embednoinvoice = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - You're not in a voice channel !`)
    
    .setColor(embedcolor)
	.setTimestamp();
	const embednosong = new Discord.MessageEmbed()
	.setTitle('Error!')
	.setDescription(`${client.emotes.error} - No songs currently playing !`)
   
    .setColor(embedcolor)
	.setTimestamp();
	const embedresume = new Discord.MessageEmbed()
	.setTitle('Resumed!')
	.setDescription(`${client.emotes.success} - Song ${client.player.getQueue(message).playing.title} **resumed** !`)

    .setColor(embedcolor)
	.setTimestamp();
    if (!message.member.voice.channel) return message.channel.send(embednoinvoice);

    if (!client.player.getQueue(message)) return message.channel.send(embednosong);

    client.player.resume(message);

    message.channel.send(embedresume);

    }
};