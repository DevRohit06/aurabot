const Discord = module.require("discord.js");

module.exports = {
  config: {
    name: "yomama",
    group: 'fun',
    description: "Add Yo Mama Before your message"
  },
    run: async(client, message, args) => {
        let ymm = args.join(" ");
        if(!ymm) {
        return message.channel.send("Please enter Some Text")
        }
        message.channel.send(`Yo mama ${ymm}`);
    }
}