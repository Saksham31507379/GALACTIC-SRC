const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = new Command({
    name: 'sethoist',
    description: `Hoists A Role`,
    userPermissions: ["MANAGE_ROLES"],
    voteOnly: true,
    botPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name: 'role',
            description: `Role To Hoist`,
            type: "ROLE",
            required: true
        },
    ],
    run: async({ interaction }) => {
        const role = interaction.options.getRole('role')
        role.setHoist(true)
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setDescription(`Hoisted ${role}`)
            ]
        })
    }
})