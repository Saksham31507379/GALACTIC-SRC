const { Command } = require("../../utils/command/command");
const { MessageEmbed } = require("discord.js");
const ms = require('ms')
const manager = require('../../events/giveawayClient')

module.exports = new Command({
    name: 'g-list',
    description: `List's the running giveaways of the server`,
    userPermissions: ["MANAGE_GUILD"],
   
    run: async({ interaction, client }) => {
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`${manager.giveaways.length} Giveaways!`)
                .setDescription(`${manager.giveaways.map((a) => [a.prize](a.messageURL))}`)
                .setFooter({
                    text: `Giveaways by Galactic`,
                    iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
                })
            ]
        })
    }
})