const Discord = require("discord.js");

module.exports = {
  config: {
    name: "announce",
    description: "Make an Announcemnet in your Server",
    group: "moderation"
  },
    run: async (client, message, args) => {
        const anchannel = message.mentions.channels.first();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You don't have enogh Permissions")
        }
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("I don't have enough Permissions")
        }
        if (!anchannel) {
        return message.channel.send("`Usage: announce <channel> <msg>`")
        }
        if (!args.slice(1).join(" ")) {
        return message.channel.send("Please add some text to make an Announcement")
        }

        let embed = new Discord.MessageEmbed()
        .setTitle(`New Server Announcement`)
        .setDescription(args.slice(1).join(" "), { allowedMentions: { parse:["users"] } })
        .setColor("BLUE")
        .setFooter(`Announcement by ${message.author.username}`);
        anchannel.send(embed);
    
        let anembed = new Discord.MessageEmbed()
        .setTitle("Done!")
        .setDescription (`Announcement has been sent to ${anchannel}`)
        .setColor("BLUE");

        message.channel.send(anembed);
        message.delete();
    }
}