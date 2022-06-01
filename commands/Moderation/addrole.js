const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const { userInfo } = require('os');

module.exports = new Command({
    name: 'addrole',
    description: `Create's A Role In Server`,
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name: 'rolename',
            description: `Name The Role To Be Created`,
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction }) => {
        const rolename = interaction.options.getString('rolename')
        interaction.guild.roles.create({
            name: `${rolename}`,
            permissions: [],
            reason: `Made By ${interaction.user.tag}`
        })
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`**Created ${rolename}**`)
            ]
        })
    }
})