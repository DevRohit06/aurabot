const db = require('quick.db');
const Discord = require('discord.js')

module.exports = {
    config: {
        name: "setprefix",
        aliases: ['sp', 'prefix'],
        group: "setup",
        description: "Sets Custom Prefix",
        usage: "[prefix]",
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**You Do Not Have Sufficient Permissions! - [ADMINISTRATOR]**")

        if (!args[0]) {
          let b = await db.fetch(`prefix_${message.guild.id}`);
          if (b) {
        return message.channel.send(
          `**Prefix Of This Server is \`${b}\`**`
        );
      } else return message.channel.send("**Please Enter A Prefix To Set!**");
    } 
      
        try {

            let a = args.join(' ');
            let b = await db.fetch(`prefix_${message.guild.id}`)

            if (a === b) {
                return message.channel.send('**This is Already The Server Prefix!**')
            } else {
                db.set(`prefix_${message.guild.id}`, a.toLowerCase())
                const embed = new Discord.MessageEmbed()
                 .setColor("BLUE")
                .setDescription(`Prefix changed to \`${a}\`. If you ever forget it just tag me.`)
                return message.channel.send(embed)
                
            }
        } catch (e) {
            console.log(e)
        }
    }
}