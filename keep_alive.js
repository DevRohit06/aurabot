const express = require('express')
const Topgg = require('@top-gg/sdk')

const app = express() // Your express app

const webhook = new Topgg.Webhook('123456789') // add your top.gg webhook authorization (not bot token)

app.post('/dblwebhook', webhook.listener(vote => {
  // vote is your vote object
  console.log(vote.user) // 221221226561929217
})) // attach the middleware

app.listen(3000) // your port