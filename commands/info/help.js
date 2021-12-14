const { MessageEmbed, Client, Message } = require('discord.js');
const db = require('quick.db')

const { PREFIX } = require('../../configs/config.json')
const { embedcolor } = require("../../configs/config.json");
module.exports.config = {
    name: "help",
    group: "info",
    usage: 'help',
    guarded: true,
    example: "help",
    botperms: ["EMBED_LINKS"],
    description: "Help menu for all commands"
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {
    let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }

        try {
            let pu = await client.commands.get(args[0]) || await client.commands.get(client.aliases.get(args[0]))

            if (client.commands.has(args[0]) || client.commands.has(client.commands.get(client.aliases.get(args[0]).config.name))) {


                                 return message.channel.send(`
    
${pu.config.name ? `**Name:** ${pu.config.name}` : ""}${pu.config.description ? '\n' : ""}${pu.config.description ? `**Description:** ${pu.config.description}` : ""}${pu.config.aliases ? '\n' : ""}${pu.config.aliases ? `**Aliases:** ${pu.config.aliases.join(', ')}` : ""}${pu.config.group ? '\n' : ""}${pu.config.group ? `**Group:** ${pu.config.group}` : ""}${pu.config.permissions ? '\n' : ''}${pu.config.permissions ? `**Permissions:** ${pu.config.permissions.join(', ').toLocaleLowerCase()}` : ""}${pu.config.usage ? '\n' : ""}${pu.config.usage ? `**Usage:** ${pu.config.usage}` : ""}${pu.config.example ? "\n" : ""}${pu.config.example ? `**Example:** ${pu.config.example}` : ""}                             

                `)

            } else {

            }
        } catch {
        }
                

    if (!args[0]) {
        let embed = new MessageEmbed()
        .setColor(embedcolor)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle("Aura bot")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`The prefix for this server is \`${prefix}\` \n Type \`help [command]\` for help with a command \n\n<:mod:836959533729447966> **Moderaton Commands.** -\`${prefix}help moderation\`  \n\n<:backup:837589289369075732> **Backup Commands**  - \`${prefix}help backup\` \n\n<:fun:836961187916808242> **Fun commands** - \`${prefix}help fun\` \n\n<:eco:837317770823073803> **Economy Command** - \`${prefix}help economy\` \n\n<:games:837308098690940948> **Games Command** - \`${prefix}help games\`\n\n<:anime:837591477215297558> **Anime Commands** - \`${prefix}help anime\` \n\n<:action:847156005615304834> **Action Commands** - \`${prefix}help action\`  \n\n<:info:836959264860798976> **info commands** - \`${prefix}help info\`    \n\n<:level:837748104269922355> **Level Command ** - \`${prefix}help level\` \n\n<:ai:836966083873341521> **Chatbot commands** - \`${prefix}help chatbot\` \n\n<:image:836966690386477117> **Image commands** - \`${prefix}help image\`  \n\n<:music:836966962353537024> **Music commands** - \`${prefix}help music\`  \n\n<:giveaway:836967977949462569> **Giveaway Commands** - \`${prefix}help giveaway\` \n\n<:setup:837026747353792532>  **Setup commands** - \`${prefix}help setup\` \n\n<:ticket1:842499480342364210>  **Ticket commands** - \`${prefix}help ticket\` \n\n<:other:836967600042672198> **Others commands** - \`${prefix}help other\` `, true)
         .addField("Invite Link: ",`**[Click Here!](https://discord.com/api/oauth2/authorize?client_id=834794936037539877&permissions=8&scope=bot)**`, true)
          .addField("Support Server:", `**[Click here!](https://discord.gg/fQpXBvBp8w)**`, true)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
    message.channel.send(embed)
    };

     if (args[0] === 'fun') {
        let fun = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'fun') fun.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const funEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Fun commands** \n\n ${fun.join('\n')}`)

        message.channel.send(funEmbed);
     };
        if (args[0] === 'action') {
        let action = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'action') action.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const actionEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Action commands** \n\n ${action.join('\n')}`)

        message.channel.send(actionEmbed);
     };
     if (args[0] === 'giveaway') {
        let give = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'giveaway') give.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const giveEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Giveaway commands** \n\n ${give.join('\n')}`)

        message.channel.send(giveEmbed);
     };
      if (args[0] === 'ticket') {
        let ticket = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'ticket') ticket.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const ticketEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Ticket commands** \n\n ${ticket.join('\n')}`)

        message.channel.send(ticketEmbed);
     };

     if (args[0] === 'anime') {
         let misc = [];

         client.commands.forEach((command) => {
            if (command.config.group === 'anime') misc.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const miscEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Anime commands** \n\n ${misc.join('\n')}`)

        message.channel.send(miscEmbed);

     }
     if (args[0] === 'level') {
        let level = [];
     
        client.commands.forEach((command) => {
           if (command.config.group === 'level') level.push(`\`${command.config.name}\` - ${command.config.description}`);
       })

       const levelEmbed = new MessageEmbed()
       .setColor(embedcolor)
       .setDescription(`**Level commands** \n\n ${level.join('\n')}`)

       message.channel.send(levelEmbed);
     }

     if (args[0] === 'chatbot') {
        let mnge = [];
     
        client.commands.forEach((command) => {
           if (command.config.group === 'chatbot') mnge.push(`\`${command.config.name}\` - ${command.config.description}`);
       })

       const managementEmbed = new MessageEmbed()
       .setColor(embedcolor)
       .setDescription(`**chatbot commands** \n\n ${mnge.join('\n')}`)

       message.channel.send(managementEmbed);
     }
     if (args[0] === 'backup') {
        let backup = [];
     
        client.commands.forEach((command) => {
           if (command.config.group === 'backup') backup.push(`\`${command.config.name}\` - ${command.config.description}`);
       })

       const backupEmbed = new MessageEmbed()
       .setColor(embedcolor)
       .setDescription(`**Backup Command** \n\n ${backup.join('\n')}`)

       message.channel.send(backupEmbed);
     }


     if (args[0] === 'image') {
         let configuration = [];
     
         client.commands.forEach((command) => {
            if (command.config.group === 'images') configuration.push(`\`${command.config.name}\` - ${command.config.description}`);
        })

        const configEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Image commands** \n\n ${configuration.join('\n')}`)

        message.channel.send(configEmbed);

        }

         if (args[0] === 'games') {
         let games = [];
     
         client.commands.forEach((command) => {
            if (command.config.group === 'games') games.push(`\`${command.config.name}\` - ${command.config.description}`);
        })

        const gamesEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Games commands** \n\n ${games.join('\n')}`)

        message.channel.send(gamesEmbed);

        }
        if (args[0] === 'economy') {
         let economy = [];
     
         client.commands.forEach((command) => {
            if (command.config.group === 'economy') economy.push(`\`${command.config.name}\` - ${command.config.description}`);
        })

        const ecoEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Economy commands** \n\n ${economy.join('\n')}`)

        message.channel.send(ecoEmbed);

        }

    if (args[0] === 'info' || args[0] === 'information') {
        let infoo = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'info') infoo.push(`\`${command.config.name}\` - ${command.config.description}`);
        })
        const infoEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Info commands** \n\n ${infoo.join('\n')}`)

        message.channel.send(infoEmbed);
    }
    if (args[0] === 'moderation') {
        let mod = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'moderation') {
                mod.push(`\`${command.config.name}\` - ${command.config.description}`);
            }
            });

        const modEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**_Moderation commands_** \n\n ${mod.join('\n')}`)

        message.channel.send(modEmbed);
    }
    if (args[0] === 'music') {
        let music = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'music') {
                music.push(`\`${command.config.name}\` - ${command.config.description}`);
            }
            });

        const musicEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**Music commands** \n\n ${music.join('\n')}`)

        message.channel.send(musicEmbed);
    }
    if (args[0] === 'other') {
        let other = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'other') {
                other.push(`\`${command.config.name}\` - ${command.config.description}`);
            }
            });

        const otEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**other commands** \n\n ${other.join('\n')}`)

        message.channel.send(otEmbed);
    }
    if (args[0] === 'setup') {
        let setup = [];
        client.commands.forEach((command) => {
            if (command.config.group === 'setup') {
                setup.push(`\`${command.config.name}\` - ${command.config.description}`);
            }
            });

        const setupEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setDescription(`**other commands** \n\n ${setup.join('\n')}`)

        message.channel.send(setupEmbed);
    }
}