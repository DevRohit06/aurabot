const { MessageEmbed } = require("discord.js");
const config = require("../../configs/config.json");
const AnimeFact = require("anime-facts");
const api = new AnimeFact("bc67a55d76f4ad50c0d3d7e70a6f502804704465ce6f");


module.exports = {
  config: {
    name: "factanime",
    group: "anime",
    description: "Get random anime facts.",
    aliases: ["Fact", "Facts", "Anifact"],
    usage: "",
    accessableby: "",
  },
  run: async (client, message, args) => {
    api.getFact().then((res) => {
      const embed = new MessageEmbed()
        .setColor(config.embedcolor)
        .setTitle("Did you know?")
        .setThumbnail(
          "https://monophy.com/media/uproGa8t6xLAeyebCr/monophy.gif"
        )
        .setDescription(res.fact);
      message.channel.send(embed);
    });
  },
};
