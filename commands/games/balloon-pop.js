
const { Collection } = require('discord.js');
const { randomRange, verify, awaitPlayers } = require('../../util/Util');

module.exports =  {
  config: {
            name: 'balloon-pop',
            group: 'games-mp',
            memberName: 'balloon-pop',
            description:
                "Don't let yourself be the last one to pump the balloon before it pops!",
            credit: [
                {
                    name: 'PAC-MAN Party',
                    url: 'http://pacman.com/en/pac-man-games/pac-man-party',
                    reason: 'Concept',
                },
            ],
            args: [
                {
                    key: 'playersCount',
                    prompt: 'How many players are you expecting to have?',
                    type: 'integer',
                    min: 2,
                    max: 100,
                },
            ],
        },
    

    run: async(message, client, { playersCount },ops) => {
        const current = ops.games.get(message.channel.id);
        if (current) {
            return message.reply(
                `Please wait until the current game of \`${current.name}\` is finished.`
            );
        }
        ops.games.set(message.channel.id, { name: 'balloon-pop' });
        try {
            const awaitedPlayers = await awaitPlayers(message, playersCount, 2);
            if (!awaitedPlayers) {
                ops.games.delete(message.channel.id);
                return message.say('Game could not be started...');
            }
            const players = new Collection();
            for (const player of awaitedPlayers) {
                players.set(player, {
                    pumps: 0,
                    id: player,
                    user: await client.users.fetch(player),
                });
            }
            let loser = null;
            let remains = players.size * 250;
            let turns = 0;
            const rotation = players.map((player) => player.id);
            while (!loser) {
                const user = players.get(rotation[0]);
                let pump;
                ++turns;
                if (turns === 1) {
                    await message.say(`${user.user} pumps the balloon!`);
                    pump = true;
                } else {
                    await message.say(
                        `${user.user}, do you pump the balloon again?`
                    );
                    pump = await verify(message.channel, user.user);
                }
                if (pump) {
                    remains -= randomRange(10, 100);
                    const popped = Math.floor(Math.random() * remains);
                    if (popped <= 0) {
                        await message.say('The balloon pops!');
                        loser = user;
                        break;
                    }
                    if (turns >= 5) {
                        await message.say(`${user.user} steps back!`);
                        turns = 0;
                        rotation.shift();
                        rotation.push(user.id);
                    }
                } else {
                    await message.say(`${user.user} steps back!`);
                    turns = 0;
                    rotation.shift();
                    rotation.push(user.id);
                }
            }
            ops.games.delete(message.channel.id);
            return message.say(
                `And the loser is... ${loser.user}! Great job everyone else!`
            );
        } catch (err) {
            ops.games.delete(message.channel.id);
            throw err;
        }
    }
};