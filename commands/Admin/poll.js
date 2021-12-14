const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "poll",
        description: "polling",
        group: "moderation",
        usage: "[question]",
        noalias: "No Aliases",
        accessableby: "Administrator",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("**You Do Not Have Sufficient Permissions! - [MANAGE_GUILD]**");

        if (!args[0])
            return message.channel.send("**Please Enter A Query!**");
            let user = message.member.user.tag;
            let poll = args.join(' ')

        
        var msg = await message.channel.send(`**${user}** asks: ${poll}`);

        await msg.react('👍');
        await msg.react('👎');

        message.delete({ timeout: 1000 });
    }
}