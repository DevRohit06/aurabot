const request = require('request');
module.exports = {
  config: {
  enabled: true,
  aliases: ['wtc'],
  guildOnly: false,
  permLevel: 'User',
  name: 'whatthecommit',
  category: 'Fun',
  description: 'Returns a random commit message',
  usage: 'whatthecommit'
  },


run: async (client, message, args,) => {
  try {
    request('http://whatthecommit.com/index.txt', (req, res, txt) => message.channel.send('**Commit Message:** ' + txt));
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
}
}


