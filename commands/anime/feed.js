const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  config: {
  name: "feed",
  description: "Feed someone ~_~",
  group: "action",
  usage:"feed @user"
  },
 run: async (bot, message) =>{
    const data = await fetch("https://nekos.life/api/v2/img/feed").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const fed = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} Fed ${fed}`)
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};