const client = require("../index")
const { MessageEmbed } = require("discord.js")

client.on("guildCreate", async(guild) => {
    const channelToSend = 
guild.channels.cache.forEach((channel) => {

    if (channel.type === "GUILD_TEXT" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel

})

if (!channelToSend) return;

const channelEmbed = new MessageEmbed()
.setAuthor({
    name: `${client.user.tag}`,
    iconURL: `${client.user.displayAvatarURL({dynamic: true})}`
})
.setTitle(`Thanks!`)
.setThumbnail(`${guild.iconURL({dynamic: true})}`)
.setDescription(`**Thanks! For Adding Me In ${guild.name} 😊 \n Wait For 10-20s Till My Slash Commands Get Loaded \n  My Prefix - \`/\` \n To get List Of All My Commands use \`/help\`**`)
    

channelToSend.send({ embeds: [channelEmbed] }).catch(err => {
    if (err) console.log(err)
})
})