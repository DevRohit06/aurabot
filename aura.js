// PACKAGES
const keep_alive = require('./keep_alive.js')
const Discord = require('discord.js');
const config = require('./configs/config.json');
const { prefix } = require('./configs/config.json');
const { PREFIX } = require('./configs/config.json');
const { dev } = require('./configs/config.json');
const fs = require('fs');
const { Database } = require("quickmongo")
const db = new Database(process.env.MONGO_URL)
const db1 = require('quick.db')
const SQLite = require("better-sqlite3")
const sql = new SQLite('./mainDB.sqlite')
const fetch = require("node-fetch");
const canvas = require("./canvas");
const canva = require(`canvas`)
const MongoClient = require('./util/MongoClient');
const bot = new MongoClient({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] }, fetchAllMembers: false });
const Statcord = require("statcord.js");
const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()
const  ultrax = require('ultrax')
const { registerFont } = require('canvas')

// Registering the font
registerFont('FredokaOne-Regular.ttf', { family:  "FredokaOne-Regular" });
// Getting registerFont() from canvas

// Event

// Handlers And Client


const client = new Discord.Client({
  autoReconnect: true,
  disableEveryone: true,
  disabledEvents: ["TYPING_START"],
  partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION'],
  shard: "auto"
});
const Topgg = require('@top-gg/sdk')

const api = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNDc5NDkzNjAzNzUzOTg3NyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI0MzU2MzIzfQ.tSslyszQ58stgA-RD-JidybDbUXm2iHN6QiPGZvVn9U")

setInterval(() => {
  api.postStats({
    serverCount: client.guilds.cache.size,
    //shardId: client.shard.ids[0], // if you're sharding
    //shardCount: client.options.shardCount
  })
}, 10000)
const webhook = new Topgg.Webhook('123456789')

const disbut = require('discord-buttons')(client);


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const cooldowns = new Discord.Collection();
const talkedRecently = new Map();

const { Player } = require('discord-player');
const player = new Player(client);
client.player = player;
client.emotes = require('./configs/emotes.json')
client.filters = require('./configs/filters.json');

["aliases", "commands"].forEach(cmd => client[cmd] = new Discord.Collection());
["console", "command", "event"].forEach(events => require(`./handlers/${events}`)(client));
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.categories = fs.readdirSync('./commands');

fs.readdir('./player-events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./player-events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loading player event ${eventName}`);
    client.player.on(eventName, event.bind(null, client));
  });
});
client.on('ready', () => {
  console.log('Aura Started!');
client.user.setActivity('>help', { type: 'WATCHING' }) // STREAMING, WATCHING, CUSTOM_STATUS, PLAYING, COMPETING
  console.log(`${client.user.username} is available now!`)
   const levelTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'levels';").get();
  if (!levelTable['count(*)']) {
    sql.prepare("CREATE TABLE levels (id TEXT PRIMARY KEY, user TEXT, guild TEXT, xp INTEGER, level INTEGER, totalXP INTEGER);").run();
  }

  client.getLevel = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
  client.setLevel = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");
// Role table for levels
  const roleTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'roles';").get();
  if (!roleTable['count(*)']) {
    sql.prepare("CREATE TABLE roles (guildID TEXT, roleID TEXT, level INTEGER);").run();
  };



});

db.on("ready", () => {
  console.log("Database Connected!")
})

//Message Event
client.on('messageReactionAdd', async (reaction, user) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  let message = reaction.message;
  if (user.bot) return;
  let ticketid = await db.fetch(`tickets_${message.guild.id}`);
  if (!ticketid) return;
  if (reaction.message.id == ticketid && reaction.emoji.name == '🎟️') {
    reaction.users.remove(user);
    reaction.message.guild.channels.create(`ticket-${user.username}`, {
      permissionOverwrites: [
        {
          id: user.id,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
        },
        {
          id: reaction.message.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"]
        }
      ],
      type: 'text'
    }).then(async channel => {
      channel.send(`<@${user.id}>`)

      let ticketmsg = await channel.send(new Discord.MessageEmbed()
        .setTitle(`${user.username} Ticket`)
        .setDescription("Our Staff Team Will Be With you soon\nTo Close Ticket React With 🔐")
        .setFooter(reaction.message.guild.name)
      );

      ticketmsg.react('🔐')
      console.log(`${ticketmsg.id}`)
      db.set(`closeticket_${message.guild.id}_${message.author.id}`, ticketmsg.id)
    })
  }
});



client.on('messageReactionAdd', async (reaction, user) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  let message = reaction.message;
  if (user.bot) return;
  let ticketid = await db.fetch(`closeticket_${message.guild.id}_${message.author.id}`);
  if (!ticketid) return;
  if (reaction.message.id == ticketid && reaction.emoji.name == '🔐') {
    reaction.message.channel.setName(`Closed`)
    reaction.users.remove(user);
    reaction.message.channel.send(`**Ticket Closed**`)
    reaction.message.channel.delete()
  }
});


client.login(process.env.token)

// EVENTS


const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

client.on("guildCreate", guild => {
  client.channels.cache.get('847506798202323035').send(`** NEW GUILD **\n Server: ${guild.name}\n Server ID: ${guild.id}`)
});
client.on("guildRemove", guild => {
  client.channels.cache.get('847506798202323035').send(`** GUILD REMOVED **\n Server: ${guild.name}\n Server ID: ${guild.id}`)
});


//CHATBOT FEATURE 

client.on("message", async (message) => {
  const ch = await db.get(`chatbot_${message.guild.id}`);
  var sChannel = message.guild.channels.cache.get(ch);
  if (message.channel.id == ch){
  if (message.author.bot) return;
  message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
  if (message.content.includes(`@`)) {
    return sChannel.send(`**:x: Please dont mention anyone**`);
  }
  sChannel.startTyping();
 if (!message.content) return message.channel.send("Please say something.");
    scb.chat({message: message.content, name: client.user.username, owner:"Rohit06", user: message.author.id, language:"en"}).then(reply => {
    message.channel.send(`> ${message.content} \n <@${message.author.id}> ${reply}`);
    })
  sChannel.stopTyping();
  }
});

client.snipes = new Map();
client.on("guildMemberAdd", async member => {
  const check = await db1.fetch(`autorole-${member.guild.id}`);
  const RoleMem = await db1.get(`autorole-${member.guild.id}`);
  const memberrole = member.guild.roles.cache.get(RoleMem);
  if (check) {
    member.roles.add(memberrole);
    console.log('role added')
  }
  let background;
  let backgrounds = db1.fetch(`background_${member.guild.id}`)
  if (backgrounds == null) {
    background = 'https://dontpanic.blog/wp-content/uploads/2019/07/976234.png'
  } else {
    background = backgrounds
  }
let bg = 'https://dontpanic.blog/wp-content/uploads/2019/07/976234.png'
  let Channel = await db1.get(`Welcome_${member.guild.id}_Channel`);
  if (!Channel) return;
  let Message = await db1.get(`Welcome_${member.guild.id}_Msg`);
  if (!Message) Message = `Welcome To The Server!`;

  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";

  const channelID = client.channels.cache.get(Channel);
  let Msg = Message.replace("<servername>", member.guild.name).replace("<membername>", member.user.username).replace("<membermention>", `<@${member.user.id}>`);
// defining text_1 (title)
let  avatar = member.user.displayAvatarURL({ format:  "png" })
let  text1 = "welcome"
// defining text_2 (subtitle)
let  text2 = member.user.tag
// defining text_3 (footer)
let  text3 = `You're the ${member.guild.memberCount}th member`
// defining the color, here its white
let  color = '#ffffff'
// defining the options and setting them (Those are optional)
const  options = {
  font:  "FredokaOne-Regular",
	text1_fontSize: 80,
	text2_fontSize: 50,
	text3_fontSize: 30
}

// creating the image
const  Image = await  ultrax.welcomeImage(bg, avatar, text1, text2, text3, color, options)


 
  let embedon = await db1.get(`embed_${member.guild.id}`)
  if (embedon) {
    const embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTimestamp()
      .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
      .setDescription(Msg)
        .setImage(Image)
 
      return client.channels.cache.get(Channel).send(embed);
  }
  if (!embedon) {
     return client.channels.cache.get(Channel).send(Msg, Image);
  }



});
client.on("guildMemberRemove", async member => {
  let background;
  let backgrounds = db1.fetch(`background_${member.guild.id}`)
  if (backgrounds == null) {
    background = 'https://htmlcolors.com/gradients-images/35-pushcrew-color-gradient.jpg'
  } else {
    background = backgrounds
  }
  let Channel = await db1.get(`Leave_${member.guild.id}_Channel`);
  if (!Channel) return;
  let Message = await db1.get(`Leave_${member.guild.id}_Msg`);
  if (!Message) Message = `${member.user.username} Has Left The Server!`;

  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";

  let Msg = Message.replace("<servername>", member.guild.name).replace("<membername>", member.user.username).replace("<membermention>", `<@${member.user.id}>`);
 // defining text_1 (title)
let  avatar = member.user.displayAvatarURL({ format:  "png" })
let  text1 = "welcome"
// defining text_2 (subtitle)
let  text2 = member.user.tag
// defining text_3 (footer)
let  text3 = `You're the ${member.guild.memberCount}th member`
// defining the color, here its white
let  color = '#ffffff'
// defining the options and setting them (Those are optional)
const  options = {
	text1_fontSize: 80,
	text2_fontSize: 50,
	text3_fontSize: 30
}

// creating the image
const  Image = await  ultrax.welcomeImage(background, avatar, text1, text2, text3, color, options)



  let embedoff = await db1.get(`embedon_${member.guild.id}`)
  if (embedoff) {
    const embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTimestamp()
      .setFooter("Bye", member.guild.iconURL({ dynamic: true }))
      .setDescription(Msg)
              .setImage(Image)


      return client.channels.cache.get(Channel).send(embed);
  }
  if (!embedoff) {
     return client.channels.cache.get(Channel).send(Msg, Image);
  }
});
client.on("message", async (message, guild) => {
  const Blacklisted = db1.get(`blacklistedUsers_${message.author.id}`)
  if (message.author.client || message.author.bot) return;
  if (Blacklisted == true) return
  if (message.channel.type === "dm") {
    const dmEmbed = new Discord.MessageEmbed()
      .setTitle('New DM')
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(`**User:** ${message.author.tag}\n**User ID:** ${message.author.id}\n**At:** ${new Date()}\n\n**Content:** \`\`\`${message.content}\`\`\``)

    const DMC = Client.channels.cache.get('847506838479175680')
    DMC.send(dmEmbed)
  }





});
client.on("guildCreate", guild => {
  const embed = new Discord.MessageEmbed()
    .setTitle("I'm added to a new server!")
    .setColor("GREEN")
    .setDescription(`I'm added to ${guild.name}, with ${guild.memberCount}\n\nTotal server: ${client.guilds.cache.size}\nTotal users: ${client.users.cache.size}`)
    .setTimestamp()
  const LogChannel = client.channels.cache.get('847506838479175680')
  LogChannel.send(embed)
})


client.on("guildDelete", guild => {
  const embed = new Discord.MessageEmbed()
    .setTitle("I left a server")
    .setColor("RED")
    .setDescription(`I left ${guild.name}, that had ${guild.memberCount}\n\nTotal server: ${client.guilds.cache.size}\nTotal users: ${client.users.cache.size}`)
    .setTimestamp()
  const LogChannel = client.channels.cache.get('847506838479175680')
  LogChannel.send(embed)
})
client.on("message", async (message) => {
     let channel1 = await db.fetch(`xpchannel_${message.guild.id}`);
     var sChannel = message.guild.channels.cache.get(channel1);
   if (message.author.bot) return;
  if (!message.guild) return;
        // get level and set level
        const level = client.getLevel.get(message.author.id, message.guild.id) 
        if(!level) {
          let insertLevel = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (?,?,?,?,?,?);");
          insertLevel.run(`${message.author.id}-${message.guild.id}`, message.author.id, message.guild.id, 0, 0, 0)
          return;
        }
      
        const lvl = level.level;

      // xp system
        const generatedXp = Math.floor(Math.random() * 16);
        const nextXP = level.level * 2 * 250 + 250
        // message content or characters length has to be more than 4 characters also cooldown
      if(talkedRecently.get(message.author.id)) {
        return;
      } else { // cooldown is 10 seconds
            level.xp += generatedXp;
            level.totalXP += generatedXp;
            

      // level up!
        if(level.xp >= nextXP) {
                level.xp = 0;
                level.level += 1;
        let embed = new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(`**Congratulations** ${message.author}! You have now leveled up to **level ${level.level}**`)
              .setColor("RANDOM")
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp();
        // using try catch if bot have perms to send EMBED_LINKS   
        if(sChannel){   
        try {
        sChannel.send(embed);
        } catch (err) {
          sChannel.send(`Congratulations, ${message.author}! You have now leveled up to **Level ${level.level}**`)
        }
        }
        if(!sChannel){   
        try {
        message.channel.send(embed);
        } catch (err) {
          message.channel.send(`Congratulations, ${message.author}! You have now leveled up to **Level ${level.level}**`)
        }
        }
      };
      client.setLevel.run(level);
      // add cooldown to user
  talkedRecently.set(message.author.id, Date.now() + 10 * 1000);
  setTimeout(() => talkedRecently.delete(message.author.id, Date.now() + 10 * 1000))    
      }
            // level up, time to add level roles
            const member = message.member;
            let Roles = sql.prepare("SELECT * FROM roles WHERE guildID = ? AND level = ?")
            
            let roles = Roles.get(message.guild.id, lvl)
            if(!roles) return;
            if(lvl >= roles.level) {
            if(roles) {
            if (member.roles.cache.get(roles.roleID)) {
              return;
            }
               if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
                 return
               }
             member.roles.add(roles.roleID);
            }}
})





