const Discord = require('discord.js');
const config = require('../../configs/config.json');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const { re } = require('mathjs');

module.exports = {
  config: {
    name: "systeminfo",
    aliases: ["systemstats", "system", "systeminformation"],
    group: "info",
    description: "Gives my system information",
    example: `systeminfo`
  },

    run: async(client, message, args) => {

        const { totalMemMb, usedMemMb } = await mem.info();

        const systeminfo = stripIndent`
        OS        : ${await os.oos()}
        CPU       : ${cpu.model()}
        Cores     : ${cpu.count()}
        CPU Usage : ${await cpu.usage()} %
        RAM       : ${totalMemMb} MB
        RAM Usage : ${usedMemMb} MB 
        `;

        const embed = new Discord.MessageEmbed()
        .setTitle(`<:info:836959264860798976> My System Information !!`)
        .setDescription(`\`\`\`yaml\n${systeminfo}\`\`\``)
        .setTimestamp()
        .setColor("BLUE")

        message.channel.send(embed)
    }
}