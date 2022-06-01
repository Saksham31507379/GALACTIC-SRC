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
    name: 'addbadge-supporter',
    description: `Add's A Badge In The Profile of a user`,
    ownerOnly: true,
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
        const int = interaction.user.id

        
        
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
                    .setDescription(`Added <:sh_supporter:962339308348534814> Badge To ${member}`)
                ]})
                member.send({
embeds: [
    new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`Hey ${member} You Just Got Supporter Badge on Your Profile Thanks for Supporting me use \`/profile\` to check it`)
]})
            } else {
                interaction.followUp({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`**${member} Already has <:sh_supporter:962339308348534814> use \`/remove-supporter\` To Remove Early Supporter**`)
                    ]
                })
            }
        })
    }
})