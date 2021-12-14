const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../configs/config.json');
const db = require('quick.db');

module.exports = {
    config: {
        name: "store",
        noalias: [""],
        group: "economy",
        description: "Shows list of items",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
      let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
        let embed = new MessageEmbed()
            .setDescription(`smartphone: 1000 [${prefix}buy/${prefix}sell] \nbicycle: 2300 [${prefix}buy/${prefix}sell bicycle]\nLaptop: 5000 [${prefix}buy/${prefix}sell laptop]\nComputer: 8000 [${prefix}buy/${prefix}sell computer] \nCar: 50,000 [${prefix}buy/${prefix}sell car]\nMansion: 2,000,000 [${prefix}buy/${prefix}sell mansion]\n\n\n **NEW ITEMS SOON**`)
            .setColor("GREEN")
        message.channel.send(embed)
    }
}