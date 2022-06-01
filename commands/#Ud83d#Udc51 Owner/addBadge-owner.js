const { Command } = require('reconlx')
const moment = require('moment')
const schema = require('../../Models/ownerSchema')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const prettyMilliseconds = require('pretty-ms')
const { userInfo } = require('os');
const { user } = require('../..');
const ms = require('ms');
const client = require('../..');

module.exports = new Command({
    name: 'addbadge-owner',
    description: `Add's Owner Badge In The Profile of a user`,
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

        if(interaction.user.id !== "788745942777462794"){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`AQUA`)
                    .setDescription(`**Only <@${config.DeveloperID}> Can use this command :D**`)
                ]
            })
        }
        
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
                    .setDescription(`**Added <:sh_owner:958298430235611226> Badge To ${member}**`)
                ]})
            } else {
                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`**${member} Already <:sh_owner:958298430235611226> use \`/remove-owner\` To Remove Owner Badge**`)
                    ]
                })
            }
        })
    }
})