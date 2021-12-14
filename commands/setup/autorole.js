
const db = require('quick.db');
module.exports = {
  config: {
    name: 'autorole',
    description: "set the role that will be given when someone joins the server!",
    group: "setup"
  },
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('You need manage roles permission to use this command!');
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if(!role) return message.channel.send('Role is not valid!')

        await db.set(`autorole-${message.guild.id}`, role.id);
        message.reply(`${role.name} is set as a autorole!`)
    }
}