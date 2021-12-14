
const Discord = require('discord.js');
const { wastedP } = require('../../configs/actions.json');

module.exports = {
  config: {
            name: 'kill',
            aliases: ['rekt', 'wrecked'],
            group: 'action',
            memberName: 'wasted',
            guildOnly: true,
            description: 'W A S T E D',
            examples: ['~wasted <user>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        
    },

    run: async (client, message, args) => {
       
     
        const wasted = wastedP[Math.round(Math.random() * (wastedP.length - 1))];
        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const embed = new Discord.MessageEmbed()
             .setColor("BLUE")
          .setDescription(`${victim} is Killed by ${message.author}`)
          .setImage(wasted)
           .setTimestamp()
           message.channel.send(embed)

       

    }
}