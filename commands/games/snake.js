const { Client, Message } = require('discord.js');
const SnakeGame = require('snakecord')
module.exports = {
  config: {
    name: 'snake',
    category: 'games',
    description: 'lets play snake game!',
    usage: 'snek'
  },
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: "BLUE",
            timestamp: true,
            gameOverTitle: " Game Over"
        });
        return snakeGame.newGame(message);
    }
}