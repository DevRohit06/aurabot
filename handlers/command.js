const fs = require('fs');
const { readdirSync } = require("fs")
module.exports = (client) => {
  const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dirs}/${file}`);
            client.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
          };
        };
    ["Admin","info", "anime", "image", "chatbot", "music", "fun", "other", "owner", "giveaway", "setup", "economy", "backup", "games", "level", ].forEach(x => load(x));
};
