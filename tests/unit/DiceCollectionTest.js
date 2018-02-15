const DiceCollection = require("../../models/DiceCollection")

test('Throws an error when the given string is not a diceString', function (t) {
    t.plan(1);
    diceString = "blep"
    try {
        const d = new DiceCollection()
        d.addDices([diceString])
    }
    catch(e){
        t.is(e, "Can't roll a " + diceString + ",\nPlease try something like: 1d6")
    }
})

test("Throws an error when the amount of dice is not a diceString", function (t) {
    t.plan(1);
    diceString = "blepd6"
    try {
        const d = new DiceCollection([diceString])
        d.addDices([diceString])
    }
    catch(e){
        t.is(e, "The amount of dice is not a number")
    }
})

test("Throws an error when the amount of dice is negative", function (t) {
    t.plan(1);
    diceString = "-1d6"
    try {
        const d = new DiceCollection([diceString])
        d.addDices([diceString])
    }
    catch(e){
        t.is(e, "Can't roll a negative amount of dice")
    }
})

test("Throws an error when the amount of sides is not a number", function (t) {
    t.plan(1);
    diceString = "1dblep"
    try {
        const d = new DiceCollection([diceString])
        d.addDices([diceString])
    }
    catch(e){
        t.is(e, "The amount of sides is not a number")
    }
})

test("Throws an error when the amount of sides is lower than 2", function (t) {
    t.plan(1);
    diceString = "1d1"
    try {
        const d = new DiceCollection([diceString])
        d.addDices([diceString])
    }
    catch(e){
        t.is(e, "Can't roll a dice with less than 2 sides")
    }
})

test("Throws an error when the maximum amount of dice is exceeded", function (t) {
    t.plan(2);
    const d = new DiceCollection()
    try {
        d.addDices(["101d6"])
    }
    catch(e){
        t.is(e, "Can't roll more than " + d.maxDice + " dice")
    }

    const d2 = new DiceCollection()
    try {
        d2.addDices(["50d6", "51d10"])
    }
    catch(e){
        t.is(e, "Can't roll more than " + d2.maxDice + " dice")
    }
})
