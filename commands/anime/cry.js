
const Discord = require('discord.js');
const { cryP } = require('../../configs/actions.json');

module.exports = {
  config: {
            name: 'cry',
            aliases: ['sob', 'waa'],
            group: 'action',
            memberName: 'cry',
            guildOnly: true,
            description: 'UWAA~',
            examples: ['cry'],
       
    },

    run: async (client, message) => {
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setImage(cryP[Math.round(Math.random() * (cryP.length - 1))]);
         message.channel.send(`${message.author} has started crying!`, {
            embed: embed,
        });
    }
};