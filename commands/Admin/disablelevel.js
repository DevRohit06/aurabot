const Discord = require('discord.js');
const config = require('../../configs/config.json');
const db = require('quick.db')

module.exports = {
    config: {
        name: 'reset-level',
        description: 'reset  the level mode in the server',
        aliases: ["resetlevel"],
        group: "level",
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
      if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("**You Do Not Have The Required Permissions! - [MANAGE_SERVER]**")

        try {
            let a  = await db.fetch(`guild_${message.guild.id}_xp_${message.author.id}`)
            let b = await db.fetch(`guild_${message.guild.id}_xptotal_${message.author.id}`)

            if (a) {
                db.delete(`guild_${message.guild.id}_xp_`)
                db.delete(`guild_${message.guild.id}_xptotal_`)
                db.delete(`guild_${message.guild.id}_level_`)

                message.channel.send("**Levels Are Disabled Successfully!**")
            }
            return;
        } catch {
            return message.channel.send("**Something Went Wrong!**")
        }
    }
}

