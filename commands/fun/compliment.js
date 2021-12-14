const { MessageEmbed } = require('discord.js')
const fetch  = require('node-fetch')

module.exports = {
  config: {
    name: 'compliment',
    description: "Gives you a compliment",
    usage: "compliment",
    group : "fun",
    aliases: []
  },
    run: async(client, message, args) => {

        const { compliment } = await fetch("https://complimentr.com/api").then((res) => res.json())

        const embed = new MessageEmbed()
        .setDescription(compliment)
        .setColor("BLUE")

        message.channel.send(embed)
    }
}