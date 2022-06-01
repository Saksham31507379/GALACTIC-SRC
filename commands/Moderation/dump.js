const { Command } = require('reconlx');
const ee = require(`../../settings/config`).embed
const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require('pretty-ms');

module.exports = new Command({
    name: 'role-info',
    description: `Show's Info About a role`,
    options: [
        {
            name: 'role',
            description: `Role about which You Want Info`,
            type: 'ROLE',
            required: true
        }
    ],
    run: async({ interaction }) => {
        const role = interaction.options.getRole('role')
        const adrole = interaction.guild.roles.cache.get(role.id)

        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor(`ff0000`)
                .setTitle(`${adrole.name}`)
                .addFields(
                    {
                        name: 'Hex Color',
                        value: `${adrole.hexColor}`,
                        inline: true
                    },
                    {
                        name: 'Role ID',
                        value: `\`${adrole.id}\``,
                        inline: false
                    },
                    {
                        name: 'Created On',
                        value: `${adrole.createdAt}`
                    },
                    {
                        name: 'Mentionable',
                        value: `${adrole.mentionable || "Not Mentionable"}`
                    },
                    {
                        name: 'Sochta',
                        value: `${adrole.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`
                    }
                   
                )
            ]
        })
    }
})