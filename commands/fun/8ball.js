const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
  config: {
  name: "8ball",
  group: "fun",
  description: "Ask your questions to the magical 8ball .",
  aliases: ["8-ball", "eightball", "eight-ball"],
  cooldown: 1,
  args: 1,
  },
  run: async (message, args) => { message.channel.send((await fetch("https://nekos.life/api/v2/8ball").then(response => response.json())).response);
  }
};
