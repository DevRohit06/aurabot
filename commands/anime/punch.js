const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  config: {
  name: "punch",
  group: "action",
  description: "Punch someone ︶︿︶"
  },
  run: async (client, message, args) => {
    
    
    let user = message.mentions.users.first () || message.author;
    let target = message.author.id == user.id ? "themselfs": user.username ;
    
    let data = await random.getAnimeImgURL("punch");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("BLUE")
    .setTitle(`${message.author.username} Punches ${target}`)
    .setDescription(`[Click here if the image failed to load](${data})`)
    .setFooter(`${message.author.username}`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};