const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
  config: {
    name: 'shit',
    description: "\"Eww. I stepped on shit.\" You get it now?",
    usage: ">shit <mention>"
  },
    run: async(client, message, args) => {
        const member = message.mentions.users.first()
        const mentionedMemberAvatar = member.displayAvatarURL({dynamic: false, format: "png"})
         

        if(!member) {
            const shitError = new MessageEmbed()
            .setDescription(`You'll Need to mention a member, or do you wanna use the command on yourself? xD`)
            .setColor("BLUE")
            return message.channel.send(shitError)
        }

        let image = await Canvacord.shit(mentionedMemberAvatar)
        let m = await message.channel.send("**Please Wait...**");

        let shit = new MessageAttachment(image, "shit.png")
m.delete({ timeout: 5000 });
        message.channel.send(shit)
    }
}