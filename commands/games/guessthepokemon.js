
const { MessageEmbed } = require("discord.js");
const { Spawn } = require("pokecord");

module.exports = {
  config: {
            name: "wtp",
            aliases: ["guessthepokemon", "guessthepokémon", "gtp"],
            description: "Who's That Pokémon",
            group: "games"
       
    },

    run: async (client, message, args) => {
        const pokemon = await Spawn().catch(e => { });
        if (!pokemon) return message.reply("Opps! Something went wrong :(");

        const filter = m => m.author.id === message.author.id;

        const embed = new MessageEmbed()
            .setTitle("Who's That Pokémon")
            .setDescription("You have 30 seconds to answer!")
            .setImage(pokemon.imageURL)
            .setColor("BLUE")
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();

        await message.reply(embed);

        message.channel.awaitMessages(filter, {
            max: 1,
            error: ["time"],
            time: 30000
        })
        .then(collected => {
            const m = collected.first();
            if (!m.content || m.content.toLowerCase() !== pokemon.name.toLowerCase()) return m.reply(`❌ | Incorrect guess! The answer was **${pokemon.name}**.`);
            return m.reply(`✅ | Correct guess!`);
        })
        .catch(() => {
            message.reply(`❌ | You did not answer in time. The correct answer was **${pokemon.name}**!`);
        });
    }

}