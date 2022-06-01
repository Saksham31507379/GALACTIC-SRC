const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const client = require("../../index")
const { Command } = require('reconlx');
const Messages = require("discord-messages")

module.exports = new Command({
    name: 'messages-display',
    description: `Display's A User's Messages`,
    userPermissions: ["VIEW_CHANNEL"],
    options: [
        {
            name: 'member',
            description: `Messages of a member to be tracked`,
            type: 'USER',
            required: false
        }
    ],
    run: async ({ interaction }) => {
        const member = interaction.options.getUser('member') || interaction.user
        const user = await Messages.fetch(member.id, interaction.guildId);

        if(!user) return interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setAuthor({
                    name: `${member.tag}`,
                    iconURL: `${member.displayAvatarURL({dynamic: true, format: "png"})}`
                })
                .setDescription(`${member.tag} Dosen't have any messages!`)
            ]
        })

        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setAuthor({
                    name: `${member.tag}`,
                    iconURL: `${member.displayAvatarURL({dynamic: true})}`
                })
                .setTitle(`Total Messages`)
                .setThumbnail(`${member.displayAvatarURL({dynamic: true, format: "png", size: 1024})}`)
                .setDescription(`**Messages of ${member}**
                
                <a:sh_messages:971441432965554196> **__Total Messages Sent - ${user.data.messages}__**`)
                .addField(`Last Message Sent On`, `${user.data.lastUpdated}`, true)
                .setFooter({
                    text: `Requested By ${interaction.user.tag}`,
                    iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`
                })
            ]
        })
        console.log(Messages)
    }
    
})