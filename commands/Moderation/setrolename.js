const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = new Command({
    name: 'setrolename',
    description: `Changes A Role's Name`,
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name: 'role',
            description: `Role's Name to be changed`,
            type: "ROLE",
            required: true
        },
        {
            name: 'name',
            description: 'Name To set Of the Role',
            type: "STRING",
            required: true
        }
    ],
    run: async({ interaction }) => {
        const role = interaction.options.getRole('role')
        const name = interaction.options.getString('name')
        role.setName(name)
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`Succesfully Role's Name Was Renamed And Set to ${name}`)
            ]
        })
        console.log(`${interaction.user.tag} Used setrolename in ${interaction.guild.name}`)
    }
})