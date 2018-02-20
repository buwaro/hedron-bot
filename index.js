// Set the project folder location
global.__basedir = __dirname;

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const Dice = require(__basedir + "/models/Dice")
const DiceCollection = require(__basedir + "/models/DiceCollection")

bot.command('roll', (ctx) => {
    try {
        var params = getParams(ctx)
        if (params.length == 0 ) {
            result = new Dice(6).roll()
        }
        else {
        var diceCollection = new DiceCollection()
        diceCollection.addDices(params)
        var result = diceCollection.rollDices().join(", ")
        }

        ctx.reply(result)
    }
    catch (error) {
        ctx.reply(error)
    }
})

bot.startPolling()

function getParams(ctx) {
    var parts = ctx.message.text.split(" ")
    parts.shift()
    return parts
}
