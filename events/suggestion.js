const simplydjs = require('simply-djs')
const client = require('../index')
let { Database } = require('quickmongo')
let db = new Database('mongodb+srv://brandan:brandan123@premiumdb.yezka.mongodb.net/Data')

client.on("interactionCreate", async(interaction) => {
    simplydjs.suggestBtn(interaction, db, {
        yesEmoji: `✅`, // default: ☑️
        yesColor: 'buttonColor', // default: green 
        noEmoji: 'emoji id', // default: X
        noColor: 'buttonColor', // default: red
        denyEmbColor: 'hex color', // default: RED
        agreeEmbColor: 'hex color', // default: GREEN
        })
})