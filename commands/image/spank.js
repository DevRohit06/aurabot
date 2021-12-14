const Discord = require('discord.js');

const config = require('../../configs/config.json');
const DIG = require("discord-image-generation");

module.exports = {
  config: {
    name: "spank",
    category: "Images",
    description: "Posts you spanking the mentioned user",
    example: `spank @Roy`
  },

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if(!user)
        return message.reply(`:x: Provide a valid user !!`)

        const avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });
        let m = await message.channel.send("**Please Wait...**");

        new DIG.Spank().getImage(message.member.user.displayAvatarURL({dynamic: false, format: 'png', size: 1024}), avatar);

        let img = await new DIG.Spank().getImage(message.member.user.displayAvatarURL({dynamic: false, format: 'png', size: 1024}), avatar);

        let attach = new Discord.MessageAttachment(img, "spank.png");
        m.delete({ timeout: 5000 });

        message.channel.send(attach)
    }
}