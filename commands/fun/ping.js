const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const config = require('../../configs/config.json');


module.exports = {
    config: {
        name: 'ping',
        group: 'fun',
        description: 'Shows bot latency',
        aliases: ["ping"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
    
        const embed = new MessageEmbed()
      .setColor(config.embedcolor)
      .setThumbnail("https://i.pinimg.com/originals/95/b5/cc/95b5cc57dcb201fe835d79762aabf4e9.gif")
      .setDescription(`  🏓`)
      .addField("• Ping:", `\`${Math.round(client.ws.ping)} ms\``, true)
      .setTimestamp()
      
    message.channel.send(embed);

    }
}

