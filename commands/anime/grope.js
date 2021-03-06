const Discord = require('discord.js');
const { disgustP, gropeP } = require('../../configs/actions.json');

module.exports =  {
  config: {
            name: 'grope',
            group: 'action',
            memberName: 'grope',
            guildOnly: true,
            description: 'Gropes..? the user you mentioned...?',
            examples: ['grope <user>'],
       
    },

    run: async (client, message) => {
        const recipient = message.content.split(/\s+/g).slice(1).join(' ');
        const disgust =
            disgustP[Math.round(Math.random() * (disgustP.length - 1))];
        const grope = gropeP[Math.round(Math.random() * (gropeP.length - 1))];
        const embed = new Discord.MessageEmbed();
        if (!recipient || message.mentions.users.first() == message.author) {
            embed.setColor('BLUE');
            embed.setImage(disgust);
            return message.channel.send(
                `${message.author} gropes... themselves..?`,
                { embed: embed }
            );
        } else if (message.mentions.users.first() == this.client.user) {
            embed.setColor('BLUE');
            embed.setImage(grope);
            return message.channel.send(
                "E-EH?! Nya! Where...are you.. touching.. (✿´ ꒳ ` ) I guess I'm okay with it as long as you are... Don't take this the wrong way!",
                { embed: embed }
            );
        } else {
            embed.setColor('BLUE');
            embed.setImage(grope);
            return message.channel.send(
                `${message.author} has started... groping ${recipient}?`,
                { embed: embed }
            );
        }
    }
};