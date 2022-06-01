const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: 'server-avatar',
    description: `Get's A User's Server Avatar If they have one`,
    userPermissions: ["VIEW_CHANNEL"],
    options: [
        {
            name: `user`,
            description: `User's avatar you want`,
            type: `USER`,
            required: true
        }
    ],
    run: async({ interaction }) => {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor(`BLURPLE`)
                .setTitle(`${user.tag}'s Server Avatar`)
                .setImage(`${member.displayAvatarURL({dynamic: true})}`)
                .setFooter({
                    text: `Shades Development | </Legend>.js#0001`,
                    iconURL: ``
                })
            ]
        })
    }
})

//©2022 Shades Development
// Must Give Credits While Using This Codes - https://dsc.gg/shades-dev
// Made By </Legend.js>#0001 | Shades Development™