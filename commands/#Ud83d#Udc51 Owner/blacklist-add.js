const { Command } = require("reconlx")
const { MessageEmbed } = require("discord.js")
const schema = require("../../Models/blacklistSchema")

module.exports = new Command({
    name: `blacklist-add`,
    description: `Blacklist's a User from using the bot`,
    ownerOnly: true,
    options: [
        {
            name: `id`,
            description: `Id of the user to be blacklisted`,
            type: "STRING",
            required: true
        },
        {
            name: `reason`,
            description: `Reason of the blacklist`,
            type: 'STRING',
            required: false
        }
    ],
    run: async({ interaction, client }) => {
        const id = interaction.options.getString("id")
        const user = client.users.cache.get(id)
        const reason = interaction.options.getString("reason")
        schema.findOne({
            User: user.id,
        }, async(err, data) => {
            if(!data){
                new schema({
                    User: user.id,
                    Reason: reason
                }).save()
            } else {
                return interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                        .setColor("BLUE")
                        .setDescription(`${user.tag} is Already Blacklisted!`)
                    ]
                })
            }
        })
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`<:sh_Greentick:969629657001504880> **${user.tag} was Blacklisted!**`)
            ]
        })
    }
})