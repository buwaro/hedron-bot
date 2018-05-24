// Set the project folder location
global.__basedir = __dirname;
global.__addonsdir = __basedir + "/addons";
const Telegraf = require('telegraf')
const fs = require("fs")

const bot = new Telegraf(process.env.BOT_TOKEN, {username: '@Hedronbot'})

// require all addons
fs.readdirSync(__addonsdir).forEach((file) => {
  global.__addondir = {}
  global.__addondir[file] = __addonsdir + "/" + file
  require(__addondir[file])(bot)
})

bot.startPolling()
