const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js")
const schema = require("../../Models/join2Create")

module.exports = new Command({
    name: `setup-join2create`,
    description: `Set's join2create channel`,
    userPermissions: ["MANAGE_GUILD"],
    options: [
        {
            name: `channel`,
            description: `channel to be set as join2create`,
            type: "CHANNEL",
            required: true
        }
    ],
    run: async({ interaction }) => {
        const channel = interaction.options.getChannel("channel")

        schema.findOne({
            Guild: interaction.guildId,
            Channel: channel.id,
        }, async(err, data) => {
            if(!data){
                new schema({
                    Guild: interaction.guildId,
                    Channel: channel.id,
                }).save()
            }
            if(data){
                return interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                        .setColor("BLUE")
                        .setDescription(`Setup is Already done - <#${data.Channel}>`)
                    ]
                })
            }
        })
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`${channel} is Join2Create Channel From Now!`)
            ]
        })
    }
})