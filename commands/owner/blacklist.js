const discord = require('discord.js')
const db = require('quick.db')
module.exports = {
  config: {
    name: 'blacklist',
    aliases: []
  },
  run: async (client, message, args, prefix) => {
    if(message.author.id !== '501431027013517333') return;
    const user = message.mentions.users.first()
    if(!user) return message.channel.send("Please mentions a user to blacklist")
    const Blacklisted = db.fetch(`blacklistedUsers_${user.id}`)
    if(Blacklisted == true) return message.channel.send("This user is already blacklisted")
    message.channel.send(`Successfully added ${user.username} to the blacklisted users`)
    db.set(`blacklistedUsers_${user.id}`, true)

}


}