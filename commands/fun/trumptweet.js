const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../configs/config.json');

module.exports = {
  config: {
    name: "trumptweet",
    aliases: ["trump", "tt"],
    example:`trumptweet Hi`,
    description: "Converts your text to trump's tweet lol",
    group: "Images"
  },

    run: async (client, message, args) => {
      let m = await message.channel.send("**Please Wait...**");   
           m.delete({ timeout: 5000 });
        if (!args.join(" ")) 
        return message.reply(':x: Please provide a message to tweet for example `>trumptweet hello` ');

        let tweet = message.content.slice(message.content.indexOf(args.join(" ")), message.content.length);

        if (tweet.length > 68) tweet = tweet.slice(0, 65) + '...';

        try{

        const res = await fetch('https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + tweet);
        const img = (await res.json()).message;

        const embed = new Discord.MessageEmbed()
        .setTitle('Trump has just tweeted something !!')
        .setImage(img)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp() 
        .setColor("BLUE");
        await message.channel.send(embed);

        } catch (err) {
            message.channel.send(` Couldn't tweet **${args.join(" ")}**`);
        }
    }
}