const { MessageEmbed } = require("discord.js")
const client = require("../index")

client.on("guildCreate", async(guild) => {
    let loggingchannel = client.channels.cache.get("967244446397771827")

    let owner = await guild.fetchOwner()

    let loggingembed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`New Guild!`)
    .setDescription(`i was Added to A new Guild Named - ${guild.name}`)
    .addField(`Owner -`,`Id - ${guild.ownerId}, Tag - ${owner.user.tag}`)
    .addField(`MemberCount - `, `${guild.memberCount}`)
    .addField(`Guild Id`, `${guild.id}`)
    .setTimestamp()
    .setFooter({
        text: `${guild.name}`,
    })

    loggingchannel.send({embeds: [loggingembed]})
})