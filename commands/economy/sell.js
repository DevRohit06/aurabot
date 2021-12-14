const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { PREFIX } = require('../../configs/config.json')

module.exports = {
    config: {
        name: "sell",
        noalias: [""],
        group: "economy",
        description: "Sell to somebody",
        usage: "[mention | ID] <amount>",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        
        let user = message.author;
        if (args.join(' ').toLocaleLowerCase() == 'smartphone') {
            let Embed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You don't have a smartphone to sell first buy a one`);
                let smartphone = await db.fetch(`smartphone_${user.id}`)


            if (smartphone < 1) return message.channel.send(Embed1)

            await db.fetch(`smartphone_${user.id}`)
            db.subtract(`smartphone_${user.id}`, 1)

            let Embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Sold A smartphone For 1000 Coins`);

            db.add(`money_${message.guild.id}_${user.id}`, 1000)
            message.channel.send(Embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'bicycle') {
            let Embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You have to buy a bicycle first`)
                const bicycle = await db.fetch(`bicycle_${user.id}`)

            if (bicycle < 1) return message.channel.send(Embed3)

            await db.fetch(`bicycle_${user.id}`)
            db.subtract(`bicycle_${user.id}`, 1)

            let Embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Sold A New bicycle For 2300 Coins`);

            db.add(`money_${message.guild.id}_${user.id}`, 2300)
            message.channel.send(Embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'laptop') {
            let Embed10 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need to buy a laptop first`);
                const laptop = await db.fetch(`laptop_${user.id}`)

            if (laptop < 1) return message.channel.send(Embed10)

            await db.fetch(`laptop_${user.id}`)
            db.subtract(`laptop_${user.id}`, 1)

            let Embed11 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Sold A New laptop For 2300 Coins`);

            db.add(`money_${message.guild.id}_${user.id}`, 5000)
            message.channel.send(Embed11)
        } else if (args.join(' ').toLocaleLowerCase() == 'computer') {
            let Embed12 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need to buy a computer first`);
                const computer = await db.fetch(`computer_${user.id}`)

            if (computer < 1) return message.channel.send(Embed12)

            await db.fetch(`computer_${user.id}`)
            db.subtract(`computer_${user.id}`, 1)

            let Embed13 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ sold A New computer For 8000 Coins`);

            db.add(`money_${message.guild.id}_${user.id}`, 8000)
            message.channel.send(Embed13)
        } 

         else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You don't have a Car to sell`);

            let cars = await db.fetch(`car_${user.id}`)

            if (cars < 1) return message.channel.send(embed3)

            db.fetch(`car_${user.id}`)
            db.subtract(`car_${user.id}`, 1)

            let embed4= new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Sold a Car For 50000 Coins`);

            db.add(`money_${user.id}`, 50000)
            message.channel.send(embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You don't have a Mansion to sell`);

            let houses = await db.fetch(`house_${user.id}`)

            if (houses < 1) return message.channel.send(sembed2)

            db.fetch(`house_${user.id}`)
            db.subtract(`house_${user.id}`, 1)

            let sembed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Sold a Mansion For 2000000 Coins`);

            db.add(`money_${user.id}`, 2000000)
            message.channel.send(sembed3)
        } else {
            if (message.content.toLowerCase() === `${prefix}sell`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Enter an item to sell. Type ${prefix}store to see list of items`)
                return message.channel.send(embed9)
            } else {
              return message.channel.send("**Not A Valid Item!**")
            }
        }
    }
}