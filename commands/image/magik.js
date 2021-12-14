const Discord = require('discord.js')
const db = require('quick.db')
const {
    AME_API
} = require('../../configs/config.json');
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(AME_API);

module.exports = {
  config: {
    name: 'magik',
    description: 'Add a dash of magik to the user\'s avatar',
    usage: 'magik [username | nickname | mention | ID]',
    group: 'images',
    guildOnly: true
  },
   run: async (client, message, args) => {
   
        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send("**Please Wait...**");
        let buffer = await AmeAPI.generate("magik", { url: user.user.displayAvatarURL({ format: "png", size: 2048 }) });
        let attachment = new Discord.MessageAttachment(buffer, "fire.png");
        m.delete({ timeout: 5000 });
        message.channel.send(attachment);

    }
}