const { MessageEmbed } = require("discord.js");
const manager = require("./giveawayClient");

manager.on("giveawayReactionAdded", async(reaction, member) => {
    member.send({
        embeds: [
            new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`<:sh_Greentick:969629657001504880> **Your Entry For This [Giveaway](${reaction.messageURL} was confirmed! \n
                You Have Some Chances to win!**)`)
        ]
    })
})
manager.on("endedGiveawayReactionAdded", async(reaction, member) => {
    reaction.reaction.delete("")
    member.send({
        embeds: [
            new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`Sorry ${member}, You Tried to Participate in the Giveaway which is already ended `)
            .setFooter({
                text: `Better Luck Next Time! :)`
            })
        ]
    })
})