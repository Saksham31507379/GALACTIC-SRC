const { Command } = require('reconlx');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: 'delrole',
    description: `Delete's A Role From The Server`,
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name: 'role',
            description: `Role To Be Deleted`,
            type: 'ROLE',
            required: true
        }
    ],
    run: async({ interaction }) => {
        const role = interaction.options.getRole('role')
        const roleperm = interaction.guild.roles.cache.get(role.id);
        if(!role.editable){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`BLURPLE`)
                    .setDescription(`Unable To Delete \`\`${roleperm.name}\`\` Because That Role Is Higher Than My Role`)
                ]
            })
        };

        if(role.name === "@everyone"){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`BLURPLE`)
                    .setDescription(`Unable To Delete Discord's Default role`)
                ]
            })
        };

        if(role.name === "@here"){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`BLURPLE`)
                    .setDescription(`Unable To Delete Discord's Default role`)
                ]
            })
        }
        interaction.guild.roles.delete(role)
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor(`BLURPLE`)
                .setDescription(`<a:tick:946092639453872200> **\`\`${role.name}\`\` Was Deleted**`)
            ]
        })
    }
})