const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed
const { MessageEmbed } = require("discord.js");
const ms = require('ms')

module.exports = new Command({
    name: 'bump',
    description: `Bump's the Server`,
    
    run: async({ interaction }) => {

        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`<:sh_tick:958961439853395988> ** Thanks ${interaction.member} for Bumping ${interaction.guild.name} Make Sure To Bump! After Every 2hrs**`)
            ],
            ephemeral: true
        })
        setTimeout(() => {
            interaction.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle(`Bump!`)
                    .setDescription(`**It's 2hrs since last bump cam someone Bump this server again ?**`)
                ]
            })
        }, 200000);
    }
})