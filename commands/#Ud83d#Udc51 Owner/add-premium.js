const { Command } = require('reconlx')
const moment = require('moment')
const schema = require('../../Models/premiumSchema')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const prettyMilliseconds = require('pretty-ms')
const { userInfo } = require('os');
const { user } = require('../..');
const ms = require('ms');
const client = require('../..');

module.exports = new Command({
    name: 'add-premium',
    ownerOnly: true,
    description: `Add's Premium in a user`,
    options: [
        {
            name: 'user',
            description: `user to be given premium`,
            type: 'USER',
            required: true
        },
        {
            name: `time`,
            description: `time till the membership validates`,
            type: "STRING",
            required: true
        }
    ],
    run: async ({ interaction, client }) => {
        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id)
        const Time = interaction.options.getString("time")
        if(user.bot){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`AQUA`)
                    .setDescription(`${user.tag} is A bot Unable To Add Premium!`)
                ]
            })
        }
        if(Time){
            const ExpireDate = Date.now() + ms(Time)
            schema.findOne({
                User: user.id,
            }, async(err, data) => {
                if(data){
                    return interaction.followUp({
                        embeds: [
                            new MessageEmbed()
                            .setColor("BLUE")
                            .setDescription(`${user} Already has a active membership!`)
                        ]
                    })
                } else 
                if(!data){
                    schema.create({
                        User: user.id,
                        Time: ExpireDate
                    })
                    setTimeout(async() => {
                        schema.deleteMany({ User: user.id, Time: ExpireDate })
                        user.send({
                            embeds: [
                                new MessageEmbed()
                                .setColor("BLUE")
                                .setDescription(`Hey ${member}, Your Premium Subscription of ${client.user.username} just ended!`)
                            ]
                        })
                        .catch(() => {});

                    }, ms(Time))
                } 
            }) 
        }
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`${user} has premium from now till ${Time}`)
            ]
        })
    }
})