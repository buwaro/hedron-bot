const Telegraf = require('telegraf')
const { reply } = Telegraf
const Dice = require("./models/Dice")
const DiceCollection = require("./models/DiceCollection")
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('roll', (ctx) => {
    try {
        var params = getParams(ctx)
        if (params.length == 0 ) {
            result = new Dice(6).roll()
        }
        else {
        var diceCollection = new DiceCollection(params)
        var result = diceCollection.rollDices().join(", ")
        }

        ctx.reply(result)
    }
    catch (error) {
        ctx.reply(error)
    }
})

bot.catch((error) => {
    console.log(error)
})

bot.startPolling()

function getParams(ctx) {
    var parts = ctx.message.text.split(" ")
    parts.shift()
    return parts
}
