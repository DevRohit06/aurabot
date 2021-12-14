const Discord = require('discord.js');
const config = require('../../configs/config.json');
const db = require('quick.db')

module.exports = {
    config: {
        name: 'leave-embed',
        description: 'toggle welcome embed on/off',
        aliases: ["Left-embed", "leaveeembed"],
        usage: '>leave-embed <on/off>',
        accessableby: "",
    },
    run: async (client, message, args) => {
          
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Messages");

    if(args[0] == 'on') {
        
        let on = db.fetch(`embedon_${message.guild.id}`)
        if(on) {
       return message.channel.send('This command is already on')
        }
        db.set(`embedon_${message.guild.id}`, args[0])
        return message.channel.send("Successfully enabled Leave embed")
    
    } 

    else if(args[0] == 'off') {
        
        let off = db.fetch(`embedon_${message.guild.id}`)
        if(off) {
         return message.channel.send('Leave embed is disabled')
        }
        db.delete(`embedon_${message.guild.id}`)
        return message.channel.send("Successfully disabled the embed")
    }
    
    else return message.channel.send('Please specify on/off')

    
    
}
}

