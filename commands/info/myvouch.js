const ms = require("parse-ms")
const db = require('quick.db')
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../configs/config.json');

module.exports = {
    config: {
        name: "myvouchs",
        aliases: ['myvouch'],
        group: 'info',
        description: 'Showing u total vouchs',
        usage: '[mention]',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        let user = message.mentions.users.first() || message.author
        let thanks = await db.get(`userthanks_${user.id}`)
        let thanksl = await db.get(`userthanks_${user.id}`)

     if(thanks > 10) thanks = "Level 1"
    if(thanks > 0) thanks = "Level 0"
    if(thanks > 20) thanks = "Level 2"
    if(thanks > 30) thanks = "Level 3"
    if(thanks > 40) thanks = "Level 4"
    if(thanks > 50) thanks = "Level 5"
	if(thanks > 60) thanks = "Level 6"
	if(thanks > 70) thanks = "Level 7"
	if(thanks > 80) thanks = "Level 8"
	if(thanks > 90) thanks = "Level 9"
	if(thanks > 100) thanks = "Level MAX"
    if(thanks === null) thanks = "New"
    let embed = new Discord.MessageEmbed()
    .setAuthor(user.username || user.user.username , user.displayAvatarURL() || user.user.displayAvatarURL())
    .addField(`User Level`, thanks || 'New', true)
    .addField(`User Total Vouchs`, thanksl || '0', true)
    .setColor('BLUE')
    .setTimestamp()
    .setFooter(message.guild.name , message.guild.iconURL())
message.channel.send(embed)
    }
};