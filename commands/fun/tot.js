const questions = require('../../configs/tot.json');
const { MessageEmbed  } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    config: {
        name: 'tot',
        group: 'fun',
        description: 'this or that',
        aliases: ["tot"],
        usage: '',
        accessableby: "",
    },

run: async (client, message, args) => {


    var messagetext =  questions[Math.floor(Math.random() * questions.length)]
    const question = messagetext;
    var Option1 = question.split(" or ")[0]
    var Option2 = question.split(" or ")[1]

    reply = {
        embed: {
            color: "#FF4242",
            "title": "Lets Play this or that! \n",
            "description": ` 🔴 ${Option1} \n or \n 🔵 ${Option2}`,
           
        },
    }
    wyrmessage = await message.channel.send(reply);
    wyrmessage.react('🔴')
    wyrmessage.react('🔵')


}
}