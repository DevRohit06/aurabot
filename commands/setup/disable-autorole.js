const Discord = require('discord.js');
const config = require('../../configs/config.json');
const emote = require('../../configs/emotes.json')
const db = require('quick.db');
module.exports = {
  config: {
    name: 'disable-autorole',
    description: "set the role that will be given when someone joins the server!",
    group: "setup"
  },
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      
    let a = db.fetch(`autorole-${message.guild.id}`)

        if (!a) {
            return message.channel.send({embed: {
            color: config.embedcolor,
            title:  ` ${emote.error} There is no Autorole set to Disable! `
        }})
        } else {
            
           // client.guilds.cache.get(message.guild.id).channels.cache.get(channel.ID).send(`** ${emote.verified} ChatBot Channel Disabled!**`)
            db.delete(`autorole-${message.guild.id}`)
    
            message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.verified} Autorole has been Succesfully Disabled! `
        }})
        }
}
}