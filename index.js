// Set the project folder location
global.__basedir = __dirname;

const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

})

bot.startPolling()
