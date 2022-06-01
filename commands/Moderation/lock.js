const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const ms = require("ms")
const schema = require("../../Models/lockDownSchema")

module.exports = new Command({
    name: `lock`,
    description: `Lock's A Channel`,
    userPermissions: ["MANAGE_CHANNELS"],
    options: [
        {
            name: 'channel',
            description: `Channel to be locked`,
            type: 'CHANNEL',
            required: false
        },
        {
            name: `time`,
            description: `Time of the lockdown`,
            type: "STRING",
            required: true
        },
    {
        name: 'reason',
        description: `reason for the lockdown`,
        type: "STRING",
        required: true
    }
    ],
    run: async({ interaction }) => {
        let time = interaction.options.getString("time")
        let reason = interaction.options.getString("reason")
        let channel = interaction.options.getChannel('channel') || interaction.channel
        
        if(!channel.permissionsFor(interaction.guild.id).has("SEND_MESSAGES")){
            return interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`This Channel is Already Locked!`)
                ]
            })
        }
        channel.permissionOverwrites.edit(interaction.guildId, {
            SEND_MESSAGES: false
        })
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`Locked the channel`)
            ]
        })
        if(time){
            const ExpireDate = Date.now() + ms(time);
            schema.findOne({
                Guild: interaction.guildId,
            }, async(err, data) => {
                if(!data){
                    schema.create({
                        Guild: interaction.guildId,
                        Channel: channel.id,
                        Reason: reason,
                        Time: ExpireDate 
                    })
                    setTimeout(async () => {
                        channel.permissionOverwrites.edit(interaction.guildId, {
                            SEND_MESSAGES: null
                        })
                        interaction.channel.send({
                            embeds: [
                                new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`The lockdown was lifted!`)
                            ]
                        })
                        .catch(() => {});
                        await schema.deleteOne({ Channel: channel.id })
                    }, ms(time))
                }
            })
        }
    } 
})