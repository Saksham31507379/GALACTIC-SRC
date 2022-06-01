const { Command } = require("reconlx")
const Discord = require("discord.js")
const client = require('../../index')

const { swap_pages } = require("../../handlers/functions");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = new Command({
    name: `leave-guild`,
    description: `Leave's a guild`,
    ownerOnly: true,
    options: [
        {
            name: 'guildid',
            description: `Guild id of the server to be left`,
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction }) => {
        let guildid = interaction.options.getString('guildid')

        let id = await client.guilds.cache.get(guildid)

        await id.leave()

        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`Left ${id.name}`)
            ]
        })
    }
})
