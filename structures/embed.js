const Discord = require('discord.js');
const { PREFIX } = require('../configs/config.json')
const db = require('quick.db')
module.exports.mention = async (message, client) => {
let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
    let embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle('Aura Bot')
        .setDescription('My prefix in this guild is `' + prefix + '`.\nUse `' + prefix + 'help` to view my commands.');
         message.channel.send(embed);
};