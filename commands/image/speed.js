
const Color = "BLUE";
const Discord = require("discord.js");

module.exports = {
  config: {
  name: "speed",
  aliases: ["iamspeed" ,"ams"],
  category: "Image",
  description: "Return A Speed Image!",
  usage: "Speed | <Mention Or ID>"
  },
  run: async (client, message, args) => {
    
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(encodeURI(`https://vacefron.nl/api/iamspeed?user=${Member.user.displayAvatarURL({ format: "png" })}`))
    .setTimestamp();

    return message.channel.send(Embed);
  }
};