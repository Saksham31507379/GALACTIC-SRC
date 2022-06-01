const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const client = require("../../index")
const { Command } = require('reconlx');
const Messages = require("discord-messages")

module.exports = new Command({
    name: 'resetmymessages',
    description: `Reset's Your Messages`,
    userPermissions: ["VIEW_CHANNEL"],
    run: async ({ interaction }) => {
        const member = interaction.user
        const user = await Messages.fetch(member.id, interaction.guildId);
        if(!user){
            return interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setAuthor({
                        name: `${interaction.user.tag}`,
                        iconURL: `${interaction.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
                    })
                    .setDescription(`<:sh_cross:958962612454961182> **You Haven't send a single message unab;e to reset**`)
                ]
            })
        }
        Messages.subtractMessages(interaction.user.id, interaction.guildId, user.data.messages);
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setAuthor({
                    name: `${interaction.user.tag}`,
                    iconURL: `${interaction.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
                })
                .setDescription(`**<:sh_tick:958961439853395988> Successfully Reseted All Messages of You in This Guild**`)
            ]
        })
    }
    
})