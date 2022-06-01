const { Command } = require('reconlx');
const ee = require(`../../settings/config`).embed
const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name: `setnick`,
    description: `Change's A user's Name in the server`,
    userPermissions: ["MANAGE_NICKNAMES"],
    options: [
        {
            name: 'name',
            description: `name to set`,
            type: `STRING`,
            required: true
        },
        {
            name: `user`,
            description: `user's name to be changed`,
            type: `USER`,
            required: true
        }
    ],
    run: async({ interaction }) => {
        const user = interaction.options.getUser('user');
        const name = interaction.options.getString('name')
        const member = interaction.guild.members.cache.get(user.id);
        if(!member.manageable){
            return interaction.followUp({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(`BLURPLE`)
                    .setDescription(`Unable To Change ${member}'s Name Because He/She Has Higher Role Than me`)
                ]
            })
        }
        member.setNickname(name)
        interaction.followUp({
            embeds: [
                new Discord.MessageEmbed()
                .setColor(`BLURPLE`)
                .setTitle(`${member.user.username}`)
                .setDescription(`${user}'s name was set to ${name} `)
                .setThumbnail(`${member.displayAvatarURL({dynamic: true})}`)
                .setFooter({
                    text: `Moderator: ${interaction.user.tag}`,
                    iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`
                })
            ]
        })
    }
    
})