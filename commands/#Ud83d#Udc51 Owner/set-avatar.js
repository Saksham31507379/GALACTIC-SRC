const { Command } = require("reconlx")
const { MessgaeEmbed, MessageEmbed } = require("discord.js")
const client = require("../..")

module.exports = new Command({
    name: `set-avatar`,
    description: `Set's bot's avatar`,
    ownerOnly: true,
    options: [
        {
            name: `avatar-url`,
            description: `Url of the avatar`,
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction }) => {
        let av = interaction.options.getString('avatar-url')

        client.user.setAvatar(av)
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`Changed Avatar `)
            ]
        })
    }
})