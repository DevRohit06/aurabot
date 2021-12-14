const config = require('../../configs/config.json');
const Discord = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');
const games = new Map()
const { PREFIX } = require('../../configs/config.json');

module.exports = async (client, message) => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    member: message.member,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
}