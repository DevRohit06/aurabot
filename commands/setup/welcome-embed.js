const Discord = require('discord.js');
const config = require('../../configs/config.json');
const db = require('quick.db')

module.exports = {
    config: {
        name: 'welcome-embed',
        description: 'toggle welcome embed on/off',
        aliases: ["wel-embed", "welcomeembed"],
        usage: '>welcome-embed <on/off>',
        accessableby: "",
    },
    run: async (client, message, args) => {
          
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Messages");

    if(args[0] == 'on') {
        
        let on = db.fetch(`embed_${message.guild.id}`)
        if(on) {
       return message.channel.send('This command is already on')
        }
        db.set(`embed_${message.guild.id}`, args[0])
        return message.channel.send("Successfully enabled Welcome embed")
    
    } 

    else if(args[0] == 'off') {
        
        let off = db.fetch(`embed_${message.guild.id}`)
        if(off) {
         return message.channel.send('Welcome embed is disabled')
        }
        db.delete(`embed_${message.guild.id}`)
        return message.channel.send("Successfully disabled the embed")
    }
    
    else return message.channel.send('Please specify on/off')

    
    
}
}

