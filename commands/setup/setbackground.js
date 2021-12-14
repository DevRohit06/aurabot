const discord = require("discord.js");
const db = require('quick.db')
module.exports = {
  config: {
    name: 'setimage',
    aliases: [],
    group: "setup"
  },

run: async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have enough permission to excute this command!")
    let background = args[0]
    if(!background) return message.channel.send("Please Provide the background link")
    message.channel.send(`successfully set the background`)
    await db.set(`background_${message.guild.id}`, args[0])

}


}