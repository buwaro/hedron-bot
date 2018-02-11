const diceRegex = /(\d*)d(\d*)/i
const Dice = require("./dice")

class DiceCollection {

    constructor(diceStrings) {
        this.dices = []
        this.addDices(diceStrings)
    }

    addDices(diceStrings) {
        for (var diceString of diceStrings) {
            if (diceRegex.test(diceString)) {
                var [amount, type] = diceRegex.exec(diceString).slice(1,3)
            }
            else {
                throw("Can't roll a " + diceString + ",\n Please try something like: 1d6")
            }
            if (amount == "") {
                amount = 1
            }

            var dice = new Dice(type)
            this.addDice(amount, dice)
        }
    }

    addDice(amount, dice) {
        this.dices.push([dice, amount])
    }

    rollDices() {
        var result = []

        for(var [dice, amount] of this.dices) {

            var i;
            for (i = 0; i < amount; i++) {
                result.push(dice.roll())
            }
        }

        return result
    }
}

module.exports = DiceCollection;
