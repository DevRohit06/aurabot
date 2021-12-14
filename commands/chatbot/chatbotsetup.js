const Discord = require('discord.js');
const { Database } = require("quickmongo")
const db = new Database(process.env.MONGO_URL)
const db1 = require('quick.db')
const { PREFIX } = require('../../configs/config.json')
const { info } = require('../../configs/emotes.json')


module.exports = {
    config: {
        name: 'chatbotsetup',
        group: "chatbot",
        description: 'Shows ChatBot\'s config',
        aliases: ["chatbot setup"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
       let prefix;
        let fetched = await db1.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
      const embedd = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `🤖 ChatBot Configuration 

        **${info} Usage :**
         Type \`${prefix}setchatbotchannel\` - To Set a Channel 
         Type \`${prefix}disablechatbotchannel\` - To Disable a Channel.
         ChatBot Channel Set - None

        **${info} Examples :**
         \`${prefix}setchatbotchannel\` <#${message.channel.id}>
         \`${prefix}disablechatbotchannel\` <#${message.channel.id}>`
      )
     
     
      .setTimestamp()
      
      .setColor('BLUE');
    
     let channel1 = await db.fetch(`chatbot_${message.guild.id}`);
    if(!channel1) return message.channel.send(embedd)
    var sChannel = message.guild.channels.cache.get(channel1);
    let embedvch = "<#" + sChannel.id + ">"
    
    const embed = new Discord.MessageEmbed()
    
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `**🤖 ChatBot Configuration** 

        **${info} Usage :**
         Type \`${prefix}setchatbotchannel\` - To Set a Channel 
         Type \`${prefix}disablechatbotchannel\` - To Disable a Channel.
         ChatBot Channel Set - ${embedvch} 

        **${info} Examples :**
         \`${prefix}setchatbotchannel\` <#${message.channel.id}>
         \`${prefix}disablechatbotchannel\` <#${message.channel.id}>`
      )
      .setColor('BLUE');
         message.channel.send(embed);
  }
}
