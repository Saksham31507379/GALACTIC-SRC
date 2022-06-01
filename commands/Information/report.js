const Discord = require('discord.js')
const moment = require('moment')
const { Command } = require('../../utils/command/command')
const { MessageEmbed } = require('discord.js')
const client = require('../..')

module.exports = new Command({
    name: 'report',
    description: `Report's A Bug`,
    options: [
        {
            name: 'bug',
            description: `Bug To be Reported`,
            type: 'STRING',
            required: true
        },
    ],
    run: async ({ interaction }) => {
        const rchannel = client.channels.cache.get("958298438196400138")
        const rowners1 = client.users.cache.get("788745942777462794")
        const rowners2 = client.users.cache.get("795903672549638194")
        const bug = interaction.options.getString('bug')

        const reportEmbed = new MessageEmbed()
        .setColor("ff0000")
        .setTitle("BUG REPORTED!")
        .setAuthor({
            name: `${interaction.user.tag}`,
            iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`
        })
        .addField(`BUG`, `${bug}`, false)
        .addField(`Reported By`, `${interaction.user.tag}`, true)
        .addField(`Reported In `, `${interaction.guild.name} > ${interaction.channel}`, true)
        rchannel.send({embeds: [reportEmbed]})
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("AQUA")
                .setDescription(`Your Bug Was Reported And Sent To ${rchannel}`)
                .addFields(
                    {
                        name: 'BUG',
                        value: `\`${bug}\``
                    }
                )
                .setThumbnail(`${interaction.guild.iconURL({dynamic: true})}`)
                .setFooter(`Note: False Submissions May lead to Account Susspension `)
            ]
        })
        interaction.member.send(`Thanks For The Feedback, We Will Try Our Best To Give You A Great Experience`)
    }
})