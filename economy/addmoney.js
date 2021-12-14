const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  config: {
  name:"addmoney",
  aliases: ["addcredits"]
},
run: async (client, message, args) => {
   const ownerID = [
    "743173584935190620",
    "755504991057346641"
  ];
  if (!ownerID.includes(message.author.id)) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.add(`money_${user.id}`, args[1])
    let bal = await db.fetch(`money_${user.id}`)
    message.channel.send(`Added \`${args[1]}\` credits to **${user}**'s balance.\n> Current balance: \`${bal}\` credits.`)

}


}