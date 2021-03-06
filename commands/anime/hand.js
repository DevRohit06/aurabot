const Discord = require('discord.js');
const { handP } = require('../../configs/actions.json');

module.exports = {
  config: {
            name: 'hand',
            aliases: ['handhold', 'holdhands'],
            group: 'action',
            memberName: 'hand',
            guildOnly: true,
            description: 'Holds hands with the user you mentioned!',
            examples: ['hand <user>'],
       
    },

    run: async(client, message) => {
        const recipient = message.content.split(/\s+/g).slice(1).join(' ');
        const hand = handP[Math.round(Math.random() * (handP.length - 1))];
        const embed = new Discord.MessageEmbed();

        if (!recipient || message.mentions.users.first() == message.author) {
            embed.setColor('BLUE');
            embed.setImage(hand);
            return message.channel.send(
                `You can\'t hold your own hand, but I'll hold your hand, ${message.author}!`,
                { embed: embed }
            );
        } else if (message.mentions.users.first() == this.client.user) {
            embed.setColor('BLUE');
            embed.setImage(hand);
            return message.channel.send(
                "K-Kya~~ I guess I'll hold you hand, senpai! (〃・ω・〃)ノ",
                { embed: embed }
            );
        } else {
            const recipient = message.content.split(/\s+/g).slice(1).join(' ');
            embed.setColor('BLUE');
            embed.setImage(hand);
            return message.channel.send(
                `${message.author} holds hands with ${recipient}!`,
                { embed: embed }
            );
        }
    }
};