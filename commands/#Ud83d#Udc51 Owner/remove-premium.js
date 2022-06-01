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
    name: 'remove-premium',
    ownerOnly: true,
    description: `Remove's User's Premium`,
    options: [
        {
            name: 'user',
            description: `Remove's user's premium `,
            type: 'USER',
            required: true
        }
    ],
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id)

        

        schema.findOne({ User: member.id }, async(err, data) => {
            if(data){
                await data.delete()
                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor(`BLURPLE`)
                        .setDescription(`${member} is No More A Premium User From now Removed Premium Perks & Badge From ${member}`)
                    ]
                })
            } else {
                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`${member} Dosen't have Supporter Badge to be removed`)
                    ]
                })
            }
        })
    }
})