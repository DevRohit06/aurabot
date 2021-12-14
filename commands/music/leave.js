const { embedcolor } = require('../../configs/config.json');
const Discord = require('discord.js')
module.exports = {
    config: {
        name: "leave",
        group: "music",
        aliases: [],
        category: "music",
        description: "Leave the voice channel",
    },
run: async (client, message, args) => {



client.player.setRepeatMode(message, false);
client.player.stop(message);

await message.member.voice.channel.leave()

const left = new Discord.MessageEmbed()
.setTitle('Left The Voice Channel')
.setDescription(`${client.emotes.success} **Successfully left the voice channel!**`)

.setColor(embedcolor)
return message.channel.send(left)
}
}
