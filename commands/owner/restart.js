const { ADMIN_ID, token } = process.env;

module.exports = {
  config: {
	name: 'restart',
	category: 'owner',
	description: 'Restarts the bot.',
	aliases: ['reload'],
	usage: 'restart'
  },
	run: async (client, message, args) => {
		if(message.author.id !== ADMIN_ID) {
			return message.channel.send(
				':x: You must have the following permissions to use that: Bot Owner.',
			);
		}
		else{
			try {
				message.channel.send('Restarting...').then(msg => msg.delete({ timeout: 300 }))
					.then(() => client.destroy())
					.then(() => client.login(token))
					.then(() => client.user.setActivity(`@Aurabot help | ${client.commands.size} Commands with ${client.users.cache.size} users on ${client.guilds.cache.size} servers`, { type: 'PLAYING' }))
					.then(() => message.channel.send('Restart Successful'));
			}
			catch(e) {
				message.channel.send(`ERROR: ${e.message}`);
			}
		}

	},
};