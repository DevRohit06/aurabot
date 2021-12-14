const Discord = require("discord.js")

module.exports.config = {
    name: "cuterate",
    
    description: 'Sends you your cute rate',
    usage: 'cutrate [user]',
    group: 'fun',
    guildOnly: true,
}
module.exports.run = async (client, message, args) => {
       let user = message.mentions.users.first() || message.author;
    let gayembed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}`)
    .addField(`Cute Rate`, `You Are **${Math.floor(Math.random() * 101)}% Cute**! <a:CH_cute:833674761963044876>`)
    .setColor('RANDOM')
    .setFooter(`😂😂 | Requested by ${message.author.tag} `)
    return message.channel.send(gayembed);
}
    
