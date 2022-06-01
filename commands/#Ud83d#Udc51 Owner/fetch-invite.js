const { Command } = require("reconlx")
const Discord = require("discord.js")
const client = require('../../index')

const { swap_pages } = require("../../handlers/functions");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = new Command({
    name: `fetch-invite`,
    description: `fetch's a guild's invite`,
    ownerOnly: true,
    options: [
        {
            name: 'guildid',
            description: `Guild id of the server`,
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction }) => {
        let guildid = interaction.options.getString('guildid')

        let id = await client.guilds.cache.get(guildid)


        let invite = await id.channels.create(`invite`, {
            type: "GUILD_TEXT"
        })

        let invcode = await invite.createInvite({})

        

        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(` ${invcode.url}`)
            ]
        })
        setTimeout(() => {
            invite.delete()
        }, 10000);
    }
    
})
