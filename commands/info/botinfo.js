const mapping = {
    " ": "  ",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "!": "!",
    "?": "?",
    "#": "#",
    "*": "*"
  };
  const Discord = require('discord.js');
  const config = require('../../configs/config.json');


module.exports = {
    config: {
        name: 'botinfo',
        group: 'info',
        description: 'Information about bot',
        aliases: ["info"],
        usage: '',
        accessableby: "",
    },
    run: async (client, message, args) => {
        "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
          });
            let guilds;
            let channels;
            let users;
          setTimeout(()=>{
            guilds = 
                `${client.guilds.cache.size}`
                .split("")
                .map(c => mapping[c] || c)
                .join("")
            channels = 
                `${client.channels.cache.size}`
                .split("")
                .map(c => mapping[c] || c)
                .join("")
                commands = 
                `${client.commands.size}`
                .split("")
                .map(c => mapping[c] || c)
                .join("")
            let sayy = 0;
            client.guilds.cache.forEach(x =>{
               
               sayy+= x.memberCount
               
             })
             users = 
                
                
                 
                 `${sayy}`
                .split("")
                .map(c => mapping[c] || c)
                .join("")
          
             },200)
            //let kullanicisayi = donustur()
          setTimeout(()=>{
            const embed = new Discord.MessageEmbed()
            
          .setThumbnail(client.user.avatarURL())
          .setDescription("**Aura Bot**"+"\n\n<:admin:837259196222537750> **Number of total commands :** " + commands +"\n<:admin:837259196222537750> **Number of servers serviced :** " + guilds +
          "\n<:admin:837259196222537750> **Number of channels served : ** " + channels +
          "\n<:admin:837259196222537750> **Number of users served : ** " + users +
          "\n\n<:VERIFIED_DEVELOPER:837331550126997515> **Developer:** \n   Rohit06#1779")
          .addField("Invite Link: ",`**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=834794936037539877&permissions=8&scope=bot)**`, true)
          .addField("Support Server:", `**[Click here!](https://discord.gg/fQpXBvBp8w)**`, true)
          
          .setTimestamp()

          .setColor(config.embedcolor);
          
          message.channel.send(embed)
                     },500)
    }
}

