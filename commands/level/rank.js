const { createCanvas, loadImage } = require("canvas");
const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./mainDB.sqlite')
const client = new Discord.Client();
const { join } = require("path")
const canvacord = require("canvacord");
const { Database } = require("quickmongo")
const db = new Database(process.env.MONGO_URL)

module.exports = {
  config: {
    name: 'rank',
    aliases: ['rank'],
    description: "Check users rank and xp",
    cooldown: 3,
    category: "Leveling"
  },
run: async(client, message, args) => {
        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let user = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

        client.getScore = sql.prepare("SELECT * FROM levels WHERE user = ? AND guild = ?");
        client.setScore = sql.prepare("INSERT OR REPLACE INTO levels (id, user, guild, xp, level, totalXP) VALUES (@id, @user, @guild, @xp, @level, @totalXP);");
        const top10 = sql.prepare("SELECT * FROM levels WHERE guild = ? ORDER BY totalXP").all(message.guild.id);
 let score = client.getScore.get(user.id, message.guild.id);
 if (!score) {
  return message.reply(`This user does not have an xp yet!`)
 }
const levelInfo = score.level
const nextXP = levelInfo * 2 * 250 + 250
const xpInfo = score.xp;
const totalXP = score.totalXP
let rankt = top10.sort((a, b) => {
  return b.totalXP - a.totalXP
});
let ranking = rankt.map(x => x.totalXP).indexOf(totalXP) + 1
if(!message.guild.me.hasPermission("ATTACH_FILES")) return message.reply(`**Missing Permission**: ATTACH_FILES or MESSAGE ATTACHMENTS`);
   let channel1 = await db.fetch(`rank_${message.guild.id}`);
        var sChannel = message.guild.channels.cache.get(channel1);
const member = message.mentions.users.first() || message.author;
	if (member.bot) {
		const embed2 = new MessageEmbed()
			.setColor('BLUE')
			.setDescription(` ** Sorry but we don't have levelling system for bots**`);
		return message.channel.send(embed2);
	}
const image = new canvacord.Rank()
            .setUsername(member.username)
            .setDiscriminator(member.discriminator)
            .setStatus(member.presence.status)
            .setCurrentXP(xpInfo)
            .setRequiredXP(nextXP)
            .setRank(ranking)
            .setLevel(levelInfo)
            .setBackground("IMAGE", "https://htmlcolors.com/gradients-images/35-pushcrew-color-gradient.jpg")
            .setAvatar(member.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setRankColor('WHITE')
        image.build().then(data => {
            const img = new Discord.MessageAttachment(data, 'Rank.png')
            if (sChannel){
              return sChannel.send(img)
            }
            if(!sChannel){
              return message.channel.send(img)
            }
        })
    }
}