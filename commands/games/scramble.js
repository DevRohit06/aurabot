const { MessageEmbed } = require('discord.js');
const { shuffle1 } = require('../../functions');
const words = require('../../assets/json/words.json');

module.exports = {
  config: {
	name: 'scramble',
	group: 'games',
	description: 'Test your knowledge and unscramble a random word',
	aliases: [],
	usage: 'scramble'
  },
	run: async (client, message, args) => {
		const filter = m => m.author.id === message.author.id;
		const word = words[Math.floor(Math.random() * words.length)];
		const scrambled = shuffle1(word);
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setDescription([`
            Word:
            \`\`\`${scrambled}\`\`\`
            *You have 30 seconds to find the correct answer.*
            `,
			]);

		message.channel.send(embed).then(() => {
			message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time', 'max'] })
				.then(collected => {
					const ans = collected.first();
					if(ans.content.toLowerCase() === word.toLowerCase()) {
						return message.channel.send('🎉 Congratulations! Your answer is correct.');
					}
					else {
						return message.channel.send(`❌ Your answer is incorrect! The correct answer is \`${word}\`.`);
					}
				})
				.catch(collected => {
					message.channel.send(':x: Looks like you did not answer in time.');
				});
		});
	},
};