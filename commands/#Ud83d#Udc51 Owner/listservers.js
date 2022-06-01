const { Command } = require("reconlx")
const client = require('../../index')
const { MessageEmbed, MessageButton } = require("discord.js")

module.exports = new Command({
    name: `srlist`,
    description: `List's Server`,
    userPermissions: ["ADMINISTRATOR"],
    run: async({ interaction }) => {
        let guilds = client.guilds.cache.map((g) => g);
        
    }
})