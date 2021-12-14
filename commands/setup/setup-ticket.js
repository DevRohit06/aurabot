const Discord = require('discord.js');
const { Database } = require("quickmongo")
const db = new Database(process.env.MONGO_URL)
const rs = require('randomstring');
module.exports = {
    config: {
        name: 'setup-ticket',
        group: 'ticket',
        aliases: [''],
        description: 'Setup ticket system',
        accessableby: 'everyone',
        usage: ' '
    },
    run: async (bot, message, args) => {
    let ticketroom = message.mentions.channels.first();
      let embed = new Discord.MessageEmbed() .setDescription(`Please Mention an vaild channel`)
      if(!ticketroom) return message.channel.send(embed);
      let sent = await ticketroom.send(new Discord.MessageEmbed()
      .setTitle("Ticket System")
      .setDescription("React With :tickets: To Open Ticket!")
      .setFooter(message.guild.name)
  );    
    sent.react('🎟️');
    db.set(`tickets_${message.guild.id}`, sent.id)
    const bestembed = new Discord.MessageEmbed()
    .setTitle('Ticket system has been done!')
    }
}