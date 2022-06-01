const { Command } = require("reconlx")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const client = require("../..")


module.exports = new Command({
    name: `destroy`,
    description: `Destroy's the Client`,
    ownerOnly: true,
    run: async({ interaction }) => {
        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`Destroying the client in 10s`)

        setTimeout(() => {
            client.destroy()
        }, 10000);
        interaction.followUp({embeds: [embed]})
    }
})