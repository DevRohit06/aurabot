const discord = require('discord.js')
const db = require("quick.db")
module.exports = {
  config: {
    name: 'toggle',
    group: "moderation",
    description: "toggle commands on or Off",
    aliases: []
  },

run: async (client, message, args, prefix) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You dont have perm to execute this command")

    function cmdName(x) {
        let a = false
        client.commands.forEach(y => {
            if(y.config.name === x) a = y.config.name;
        });
        return a
    }
    // =toggle on/off cmdName 
    if(!args[1]) return message.channel.send("Please provide a command name")
    if(args[1] === 'toggle') return message.channel.send("You can't disable this command")

    if(args[0] == 'on') {
        if(!await cmdName(args[1])) return message.channel.send("No command found with that name!")
        let commandFetch = db.fetch(`commandToggle_${message.guild.id}`)
        if(commandFetch == null) commandFetch = []
        if(!commandFetch.includes(await cmdName(args[1]))) return message.channel.send('This command is already on')
        const Filtered = commandFetch.filter(x => x !== args[1])
        db.set(`commandToggle_${message.guild.id}`, Filtered)
        return message.channel.send("Successfully enabled this command!")
    } 

    else if(args[0] == 'off') {
        if(!await cmdName(args[1])) return message.channel.send("No command found with that name!")
        let commandFetch = db.fetch(`commandToggle_${message.guild.id}`)
        if(commandFetch == null) commandFetch = []
        if(commandFetch.includes(await cmdName(args[1]))) return message.channel.send('This command is already off')
        db.push(`commandToggle_${message.guild.id}`, cmdName(args[1]))
        return message.channel.send("Successfully disabled this command!")
    } 
    
    else return message.channel.send('Please specify on/off')

}


}