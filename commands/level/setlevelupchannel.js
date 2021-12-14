const Discord = require('discord.js');
const config = require('../../configs/config.json');
const emote = require('../../configs/emotes.json')
const { Database } = require("quickmongo")
const db = new Database(process.env.MONGO_URL)

module.exports = {
    config: {
        name: 'setlevelupchannel',
        group: "level",
        description: 'Sets a Channel where users can get level up messages',
        aliases: [""], 
        usage: '<channel>',
        accessableby: "MANAGE_GUILD",
    },
    run: async (client, message, args) => {
    
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.error} You do not have the required Permissions! - [MANAGE_GUILD] `
        }})
if (!args[0]) {
  let b = await db.fetch(`xpchannel_${message.guild.id}`);
  let channelName = message.guild.channels.cache.get(b);
  if (message.guild.channels.cache.has(b)) {
    return message.channel.send(
      `**${emote.verified} Xp level up Channel Set In This Server Is \`${channelName.name}\`!**`
    );
  } else
    return message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.error} Please Enter a Channel or Channel ID to set`
        }})
}
    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

    if (!channel || channel.type !== 'text') return message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.error} Please Enter a Valid Text Channel`
        }})

    try {
        let a = await db.fetch(`xpchannel_${message.guild.id}`)

        if (channel.id === a) {
            return message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.info} This Channel is already set as level up Channel!`
        }})
        } else {
            client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`**${emote.verified} Levelup Channel Set!**`)
            db.set(`xpchannel_${message.guild.id}`, channel.id)

           message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.verified} levelup Channel has been Set Successfully \`${channel.id}\``
        }})
        }
    } catch {
        return message.channel.send(`**${emote.error} Error - Missing Permissions Or Channel Is Not A Text Channel!**`);
    }
    }
}

