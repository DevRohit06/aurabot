const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  config:{
    name: 'inventory',
    description: "View Your Inventory",
    aliases: ['inven', 'int', 'inv'],
    usage: "inventory"
  },
    run: async(client, message, args) => {

        let items = db.fetch(`items_${message.guild.id}_${message.author.id}`)
        if(items === null) items = "You have nothing nerd";

        const Embed = new MessageEmbed()
        .addField('Inventory', items)
        .setColor("BLUE")

        message.channel.send(Embed)
    }
}