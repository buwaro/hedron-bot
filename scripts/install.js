let fs = require('fs')
let shell = require('shelljs')
let addonsDir = "addons"

console.log("Installing addon dependencies...")
if (!fs.existsSync(addonsDir)) {
  console.log("Creating addons folder...")
  fs.mkdirSync(addonsDir)
}
else {
  fs.readdirSync("addons").forEach((file) => {
    if (file != ".DS_Store"){
      console.log("installing dependencies for " + file + "...")
      shell.exec("npm install --prefix " + addonsDir + "/" + file)
    }
  })
}
