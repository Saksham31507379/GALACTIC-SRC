const { Command } = require("reconlx")
const { MessageEmbed } = require("discord.js")
const snipe = require("../../Models/snipeSchema")

module.exports = new Command({
    name: `snipe`,
    description: `Get's the snipe of the channel`,
    userPermissions: ["MANAGE_MESSAGES"],
    run: async({ interaction }) => {
        let data = await snipe.findOne({
            channelId: interaction.channelId
        })

        if(!data){
            interaction.followUp({content: "No Recent Snipes to display", ephemeral: true})
        }
        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle(`Snipe!`)
        .setDescription(`A Snipe was Found!`)
        .addField(`Author`, `,<@${data.author}>`, true)
        .addField(`Message`, `${data.message}`, true)
        .addField(`Deleted`, `<t:${data.time}:R>`, true)
        
        interaction.followUp({embeds: [embed], ephemeral: true})
    }
})