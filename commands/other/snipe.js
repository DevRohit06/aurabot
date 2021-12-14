const discord = require("discord.js")
const config = require("../../configs/config.json")
const db = require("quick.db")

module.exports = {
    config: {
        name: "snipe",
        description: "Snipe last deleted command",
        usage: " ",
        category: "info",
        accessableby: "everyone",
        aliases: [""]
    },
    run: async (client, message, args) => {
        let prefix = await db.fetch(`prefix_${message.guild.id}`)
        if(prefix == null) {
            prefix = config.DEFAULT_PREFIX
        }


        const msg = client.snipes.get(message.channel.id)
        if(!msg) return message.channel.send("there is no deleted messages")
        const embed = new discord.MessageEmbed()
        .setAuthor(msg.author, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Deleted Message:** ${msg.content}`)
        .setColor('RANDOM')
        .setTimestamp()
        if(msg.image)embed.setImage(msg.image)
        message.channel.send(embed)
    }
}