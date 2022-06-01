const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const client = require("../../index")
const { Command } = require('reconlx');
const Messages = require("discord-messages")

module.exports = new Command({
    name: 'reset-server-messages',
    description: `Reset's a Guild's Messages`,
    userPermissions: ["MANAGE_GUILD"],
    run: async ({ interaction }) => {
        Messages.resetGuild(interaction.guildId);
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`<:sh_tick:958961439853395988> ** I have Successfully Reset This Guild's Messages**`)
            ]
        })
    }
    
})