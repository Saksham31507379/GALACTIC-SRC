const { Command } = require('reconlx')
const moment = require('moment')
const schema = require('../../Models/ModeratorBadge')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const prettyMilliseconds = require('pretty-ms')
const { userInfo } = require('os');
const { user } = require('../..');
const ms = require('ms');
const client = require('../..');

module.exports = new Command({
    name: 'addbadge-moderator',
    ownerOnly: true,
    description: `Add's A Badge In The Profile of a user`,
    options: [
        {
            name: 'user',
            description: `user to be given the badge`,
            type: 'USER',
            required: true
        }
    ],
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id)

        
        schema.findOne({
            User: member.id,
        }, async(err, data) => {
            if(!data){
                new schema({
                    User: member.id
                }).save()
                interaction.followUp({embeds: [
                    new MessageEmbed()
                    .setColor('BLURPLE')
                    .setDescription(`**Added <:sh_moderator:962339134406529054> Badge to ${member}**`)
                ]})
            } else {
                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`**${member} Already has <:sh_moderator:962339134406529054> Badge use \`/remove-moderator\` To Remove Moderator Badge**`)
                    ]
                })
            }
        })
    }
})