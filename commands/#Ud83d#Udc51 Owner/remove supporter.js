const { Command } = require('reconlx')
const moment = require('moment')
const schema = require('../../Models/officialStaff')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const prettyMilliseconds = require('pretty-ms')
const { userInfo } = require('os');
const { user } = require('../..');
const ms = require('ms');
const client = require('../..');

module.exports = new Command({
    name: 'remove-supporter',
    description: `Remove's supporter badge`,
    options: [
        {
            name: 'user',
            description: `Badge to be taken from user`,
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

        schema.findOne({ User: member.id }, async(err, data) => {
            if(data){
                await data.delete()
                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor(`BLURPLE`)
                        .setDescription(`** <:sh_supporter:962339308348534814> Badge was removed from ${member}**`)
                    ]
                })
            } else {
                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`**${member} Dosen't have <:sh_supporter:962339308348534814> to be removed**`)
                    ]
                })
            }
        })
    }
})