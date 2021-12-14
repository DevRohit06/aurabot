const config = require('../../configs/config.json');
const Discord = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');
const games = new Map()
const { PREFIX } = require('../../configs/config.json');
const embeds = require('../../structures/embed');
const discordblacklister = require('discord-blacklister')

module.exports = async (client, message) => {
 if(message.channel.type === 'dm') {
        const embed = new Discord.MessageEmbed()
        .setTitle('New DM')
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(`**User:** ${message.author.tag}\n**User ID:** ${message.author.id}\n**At:** ${new Date()}\n\n**Content:** \`\`\`${message.content}\`\`\``)
        

       const dm = client.channels.cache.get(`835960759258447901`)
       dm.send(embed)
    }



    let prefix;
        const fetched = await db.get(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
let argsSlice = prefix.length;
    if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) {
            let content = message.content.trim();
            let mention1 = '<@!' + client.user.id + '>';
            let mention2 = '<@' + client.user.id + '>';

            if(content == mention1 || content == mention2)
                return embeds.mention(message, client);

            if(content.startsWith(mention1)) argsSlice = mention1.length
            else if(content.startsWith(mention2)) argsSlice = mention2.length
            else return;
        }


 
    
        let timeout = 60 * 1000
  
        let myDaily = await db.get(`timeout`)
    
        if(!db.has(`${message.guild.id}.${message.author.id}.messageCount`)) {
            db.set(`${message.guild.id}.${message.author.id}.messageCount`, 1)
        } else {
            db.add(`${message.guild.id}.${message.author.id}.messageCount`, 1)
        }
        
        let args = message.content.slice(argsSlice).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        
    
        let ops = {
            games: games
        }

        var commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
             if(commandfile) {
        let commandFetch = db.fetch(`commandToggle_${message.guild.id}`)
        if(commandFetch == null) commandFetch = []
        if(commandFetch.includes(commandfile.config.name)) return message.channel.send("This command is disabled")
        commandfile.run(client, message, args, ops);
    }
      
     let customCommands = db.get(`guildConfigurations_${message.guild.id}.commands`)
  if (customCommands) {
    let customCommandsName = customCommands.find(x => x.name === cmd)
    if (customCommandsName) return message.channel.send(customCommandsName.response)
  }
   const command = client.commands.get(cmd) || client.aliases.get(cmd)
 


        
   


}
