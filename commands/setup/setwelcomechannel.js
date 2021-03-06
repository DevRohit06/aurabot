const { prefix , embedcolor } = require("../../configs/config.json");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  config: {
  name: "setchannel",
  aliases: ["setch", "sc"],
  group: "setup",
  description: "Set The Welcome Or Leave Message Channel!",
  usage: "Setchannel <Mention Channel> <Type>"
  },
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Channels");
    
    let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    
    if (!Channel || Channel.type === "voice") return message.channel.send(`Please Give A Valid Text Channel!`);
    
    let Type = args[1];
    let Welcome = ["welcome", "wel", "join"];
    let leave = ["leave", "left"];
    let Types = [];
    Welcome.forEach(wel => Types.push(wel));
    leave.forEach(leav => Types.push(leav));
    
    if (!Type || !Types.find(T => T === Type.toLowerCase())) return message.channel.send(`Please Give A Valid Type - Welcome, Wel, Join, Leave, Left`);
    
    Type = Type.toLowerCase();
        
    async function GetType(Type) {
      if (Welcome.find(W => W === Type)) {
        return "Welcome";
      } else {
        return "Leave";
      };
    };
    
    let Current = await GetType(Type);
    
    const Embed = new Discord.MessageEmbed()
    .setColor(embedcolor || "RANDOM")
    .setTitle(`Sucess`)
    .setDescription(`${Current === "Welcome" ? "Welcome" : "Leave"} Channel Has Been Setted - <#${Channel.id}>`)
    .setFooter(`Setted By ${message.author.username}`)
    .setTimestamp();

    await db.set(`${Current === "Welcome" ? "Welcome" : "Leave"}_${message.guild.id}_Channel`, Channel.id);

    try {
        return message.channel.send(Embed);
    } catch (error) {
        return message.channel.send(`${Current === "Welcome" ? "Welcome" : "Leave"} Message Has Been Setted - <#${Channel}>`);
    };

  }
};