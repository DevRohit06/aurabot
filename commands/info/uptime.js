const Discord = require('discord.js');
const config = require('../../configs/config.json');
const moment = require("moment");
require('moment-duration-format')


module.exports = {
    config: {
        name: 'uptime',
        description: 'Shows bot uptime',
        aliases: [""],
        usage: '',
        accessableby: "",
    },
    run: async (bot, message, args) => {


        let uptime = moment.duration(bot.uptime).format("D [ days] h[ hours] m[ minutes] s[ seconds]")

        const duration = moment.duration(bot.uptime)
    let bicon = bot.user.displayAvatarURL()
    const botembed = new Discord.MessageEmbed()
        .setTitle("Aura Bot")
        .setColor(config.embedcolor)
        .setDescription(`<:online:837331549836804136> **Aura has been active for** \`${uptime}\`. \n <:online:837331549836804136> **The ping is currently** \`${bot.ws.ping} ms\``)

        .setTimestamp()
       
        .setThumbnail(bicon);

    message.channel.send(botembed);
    }
}

