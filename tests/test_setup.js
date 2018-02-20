path = require("path")
global.__basedir = path.join(__dirname, "..")
global.test = require('tape')
