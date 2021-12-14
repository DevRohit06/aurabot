const questions = require('../../configs/would-you-rather.json');
const { MessageEmbed  } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    config: {
        name: 'wyr',
        group: 'fun',
        description: 'Would you rather',
        aliases: ["wyr"],
        usage: '',
        accessableby: "",
    },

run: async (client, message, args) => {


    var messagetext =  questions[Math.floor(Math.random() * questions.length)]
    var question = messagetext.split("Would you rather ")[1]
    var Option1 = question.split(" or ")[0]
    var Option2 = question.split(" or ")[1]

    reply = {
        embed: {
            color: "#FF4242",
            "title": "Lets Play Would You Rather! \n",
            "description": `Would you rather \n 🅰️ ${Option1} \n or \n :regional_indicator_b: ${Option2}`,
           
        },
    }
    wyrmessage = await message.channel.send(reply);
    wyrmessage.react('🅰️')
    wyrmessage.react('🇧')


}
}