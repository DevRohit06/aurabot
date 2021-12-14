const Discord = require('discord.js');
const { disgustP } = require('../../configs/actions.json');

module.exports =  {
  config: {
            name: 'disgust',
            aliases: ['gross', 'eww'],
            group: 'action',
            memberName: 'disgust',
            guildOnly: true,
            description:
                'Absolutely **disgusting**, now which one of you likes handholding?',
            examples: ['disgust'],
        
    },

    run: async (client, message) => {
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setImage(
                disgustP[Math.round(Math.random() * (disgustP.length - 1))]
            );
        return message.channel.send({ embed });
    }
};