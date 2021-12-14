const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../configs/config.json');
const Zalgo = require('to-zalgo')

module.exports = {
    config: {
        name: 'zalgo',
        group: 'fun',
        description: 'Converts your text to Zalgo',
        aliases: ["zalgo"],
        usage: '<text>',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        const embed = new MessageEmbed()
     .setColor(config.embedcolor)
     .setDescription(`${Zalgo(args.join(" "))}`)
     .setTimestamp()
     
    message.channel.send(embed)
    }
}

