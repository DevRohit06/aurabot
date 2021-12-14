const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { PREFIX } = require('../../configs/config.json');

module.exports = {
    config: {
        name: "buy",
        noalias: [""],
        group: "economy",
        description: "buys items",
        usage: "[item]",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let user = message.author;

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);
 

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
      
        let author = db.fetch(`money_${user.id}`)
 if (args.join(' ').toLocaleLowerCase() == 'smartphone') {
            let Embed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need 1000 coins to purchase a smartphone`);
                let items = await db.fetch(`items_${message.guild.id}_${message.author.id}`, {items: []})

            if (author < 1000) return message.channel.send(Embed1)


            await db.fetch(`smartphone_${user.id}`)
            db.add(`smartphone_${user.id}`, 1)

            let Embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Purchased A smartphone For 1000 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 1000)
            db.push(`items_${message.guild.id}_${message.author.id}`, "smartphone")
            message.channel.send(Embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'bicycle') {
            let Embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need 2300 coins to purchase a new bicycle`);

            if (author < 2300) return message.channel.send(Embed3)

            await db.fetch(`bicycle_${user.id}`)
            db.add(`bicycle_${user.id}`, 1)

            let Embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Purchased A New bicycle For 2300 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 2300)
            db.push(`items_${message.guild.id}_${message.author.id}`, "bicycle")
            message.channel.send(Embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'laptop') {
            let Embed10 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need 5000 coins to purchase a new laptop`);

            if (author < 5000) return message.channel.send(Embed10)

            await db.fetch(`laptop_${user.id}`)
            db.add(`laptop_${user.id}`, 1)

            let Embed11 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Purchased A New laptop For 2300 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 5000)
            db.push(`items_${message.guild.id}_${message.author.id}`, "laptop")
            message.channel.send(Embed11)
        } else if (args.join(' ').toLocaleLowerCase() == 'computer') {
            let Embed12 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need 8000 coins to purchase a new laptop`);

            if (author < 8000) return message.channel.send(Embed12)

            await db.fetch(`computer_${user.id}`)
            db.add(`computer_${user.id}`, 1)

            let Embed13 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Purchased A New computer For 8000 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 8000)
            db.push(`items_${message.guild.id}_${message.author.id}`, "computer")
            message.channel.send(Embed13)
        } 
        else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let Embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need 50000 coins to purchase a new car`);

            if (author < 50000) return message.channel.send(Embed5)

            await db.fetch(`car_${user.id}`)
            db.add(`car_${user.id}`, 1)

            let Embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Purchased A New Car For 50000 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 50000)
            db.push(`items_${message.guild.id}_${message.author.id}`, "car")
            message.channel.send(Embed6)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let Embed7 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need 2000000 coins to purchase a Mansion`);

            if (author < 2000000) return message.channel.send(Embed7)

            await db.fetch(`house_${user.id}`)
            db.add(`house_${user.id}`, 1)

            let Embed8 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Purchased A Mansion For 2000000 Coins`);

            db.subtract(`money_${user.id}`, 2000000)
            db.push(`items_${message.guild.id}_${message.author.id}`, "Mansion")
            message.channel.send(Embed8)
        } else {
            if (message.content.toLowerCase() === `${prefix}buy`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Enter An Item To Buy!\nType ${prefix}store To See List Of Items!`)
                return message.channel.send(embed9)
            }
        }
    }
}