const { MessageAttachment } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  config: {
            name: "changemymind",
            description: "Change my mind...",
            group: "images",
            usage: "changemymind <text>",
            aliases: ["change-my-mind", "change"]
        
    },

        run: async (client, message, args) => {
           let m = await message.channel.send("**Please Wait...**");   
           m.delete({ timeout: 5000 });
    
        const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				'❎ Please provide valid text.',
			);
		}

		const url = `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('❎ An error occured, please try again!');
		}
		const attachment = new MessageAttachment(response.message, 'clyde.png');
		return message.channel.send(attachment);
  
    }
}