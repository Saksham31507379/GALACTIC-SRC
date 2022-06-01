const { Command } = require('reconlx');
const ms = require('ms')
const config = require('../../config.json')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = new Command({
    name: 'timeout',
      userPermissions: ['TIMEOUT_MEMBERS'],
  botPermissions: ['TIMEOUT_MEMBERS'],
    description: 'Timeouts A Member/User',
    options: [
        {
            name: 'user',
            description: 'user to timeout',
            type: 'USER',
            required: 'true'
        },
        {
            name: 'length',
            description: 'Length Of The Timeout',
            type: 'STRING',
            required: 'true'
        },
        {
            name: 'reason',
            description: 'reason for which you are giving timeout',
            type: 'STRING',
            required: 'false'
        }
    ],
    run: async({ interaction }) => {
        const user = interaction.options.getUser('user')
        const length = interaction.options.getString('length')
        const reason = interaction.options.getString('reason')
        const member = interaction.guild.members.cache.get(user.id)

        const timeInMs = ms(length);
        if(!timeInMs) return interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("#ff000")
                .setDescription("Plz Provide A Valid Duration")
            ]
        })

        if(user.id === interaction.user.id){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setDescription(`You Can't timeout Yourself`)
                ]
            })
        }

        if(user.hasPermissions === "ADMINISTRATOR"){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`ff0000`)
                    .setDescription(`Unable To Timeout ${user} because he has ADMINISTRATOR PERMS`)
                ]
            })
        }

        if(user.id === interaction.guild.ownerId){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription(`<a:Cross:948849995405209630> | **${user} is Owner Of This Guild Unable To Timeout!**`)
                ]
            });
        };

        if(user.id === config.DeveloperID){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`ff0000`)
                    .setDescription(`**I Can't Timeout ${user} Because They Are My Developers**`)
                ]
            })
        }

        if(user.id === config.botId){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor("ff0000")
                    .setDescription(`You Can't Timeout Me Me `)
                ]
            })
        }

        member.timeout(timeInMs, reason)
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("#808080")
                .setDescription(`<:sh_timeout:971377903512219678> **${user.tag} Was Given Timeout for ${length} | ${reason}**`)
            ]
        })

        if(reason === "null") console.log(`No Reason Provided :`)
    }
})