const Discord = require("discord.js");

module.exports.config = {
    name: "gayrate",
    description: "tells how much gay the person is",
    usage: "gayrate <@user>",
    example: 'gayrate @user',
    group: 'fun',
    botperms: ['MANAGE_WEBHOOKS'],
    guildOnly: true
}


module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let gayembed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}`)
    .addField(`Gay Rate`, `You Are **${Math.floor(Math.random() * 101)}% Gay**! :gay_pride_flag:`)
    .setColor('RANDOM')
    .setFooter(`😂😂 | Requested by ${message.author.tag} `)
    return message.channel.send(gayembed);
}
