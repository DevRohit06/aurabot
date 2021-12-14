const discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  config: {
      name: 'betrayal',
      description: "play betrayal.io togther",
      group: "games",
    aliases: []
  },
run: async (client, message, args, prefix) => {

    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send("You have to be in a vc")

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "773336526917861400",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${process.env.token}`,
            "Content-Type": "application/json"
        }
    })
    
    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return message.channel.send("Sadly i cant start a ")
        const e = new discord.MessageEmbed()
        .setDescription(`**Join the with the below link** \n **[Click me](https://discord.com/invite/${invite.code})**`)
        message.channel.send(e)
    })
}

}