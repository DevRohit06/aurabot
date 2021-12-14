const Discord = require("discord.js");
const ownerid = ["743173584935190620"];
const ownerid2 = ["743173584935190620"];
const { MessageEmbed } = require('discord.js');
module.exports = {
  config: {
    name: "forcemessage",
    aliases: ["forcemsg"],
    category: "owner",
    description: "",
    usage: " ",
    accessableby: "Owner"
  },
  run: async (bot, message, args) => {
    if (message.author.id == ownerid || ownerid2) {
      message.delete();
         

    var args = message.content.split(' ').slice(2).join(' ');
 bot.guilds.cache.forEach((guild) =>{
                    let announce_channel = "";
                    guild.channels.cache.forEach((channel) =>{
                        if (channel.type == "text" && announce_channel === ""){
                            if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                                announce_channel = channel;
                            }
                        }
                    });
                    if (announce_channel != ""){
    const embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
         .setThumbnail(bot.user.displayAvatarURL())
        .setTitle("Message From Bot Owner!")
        .setDescription(args)
        .setTimestamp()
        .setFooter('© Aura Bot Owner');
announce_channel.send(embed)
    }
 });
    }
  }
};