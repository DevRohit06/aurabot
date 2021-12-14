const Discord = require("discord.js");
const fs = require("fs");
let config = require("../configs/config.json");

module.exports.utilisation = (message, data, emotes) => {

    if(!message || !data) return console.log('[ERRORS] Lack of message or data argument !');

    var examples = data.command.help.examples.replace(/[$_]/g,data.guild_data.prefix);

    var embed = new Discord.RichEmbed()
        .setColor(config.embed_color)
        .setFooter(config.footer)
        .addField('Standard', data.guild_data.prefix+data.command.help.usage)
        .addField('Exemple(s)', examples)
    message.channel.send(emotes[0]+' |Please check the order parameters !', embed);

}