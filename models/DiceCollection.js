const diceRegex = /(.*)d(.*)/i
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

                if (isNaN(amount)) {
                    throw("The amount of dice is not a number")
                }
                else if (amount.length == 0) {
                    amount = 1
                }
                else if (amount < 0) {
                    throw("Can't roll a negative amount of dice")
                }

                if (isNaN(type)) {
                    throw("The amount of sides is not a number")
                }
                else if (type <= 1) {
                    throw("Can't roll a dice with less than 2 sides")
                }
            }
            else {
                throw("Can't roll a " + diceString + ",\nPlease try something like: 1d6")
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
