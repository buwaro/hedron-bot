class Dice {
    constructor(type) {
        console.log("Dice")
        this.type = type
    }

    roll() {
        return Math.floor(Math.random() * this.type) + 1  
    }
}

module.exports = Dice;
