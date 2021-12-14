const { Canvas } = require("discord-utils.js")

module.exports = {
  config: {
name: "glitch",
group: "images"
  },
run: async (client, message, args) => {
let user = message.mentions.users.first() || message.author
let avatar = user.displayAvatarURL()
let image = await Canvas.glitch(avatar)
message.channel.send({
files: [{
name: "image.png",
attachment: image
}]
})
}
}
