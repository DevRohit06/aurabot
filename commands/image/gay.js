const Color = "BLUE", Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  config: {
  name: "gay",
  aliases: [],
  group: "images",
  description: "Return A Gay Image!",
  usage: "Gay | <Mention Or ID>"
  },
  run: async (client, message, args) => {
    
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const Data = await Random.Gay({ Image: Member.user.displayAvatarURL({ format: "png" }), Color: Color });

    return message.channel.send(Data);
  }
};