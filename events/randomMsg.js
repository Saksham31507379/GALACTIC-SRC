const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const client = require('../index')

client.on('guildCreate', async(guild) => {

    const channels = (await guild.channels.fetch()).filter(ch => ch.permissionsFor(guild.me).has('SEND_MESSAGES') && ch.type === 'GUILD_TEXT') // Filters all the channels the bot has send messages perms & is a text channel

    if(channels.length === 0) return; // if there are no channels, return


const randomChannel = channels.random() // selects a random channel from the filtered channels

const channel = await client.channels.cache.get(randomChannel.id)

const row = new MessageActionRow()
.addComponents(
    new MessageButton()
    .setLabel(`Invite Me`)
    .setStyle(`LINK`)
    .setURL(`https://discord.com/oauth2/authorize?client_id=935432770879119430&scope=bot%20identify%20guilds%20applications.commands`),
    new MessageButton()
    .setLabel(`Support Server`)
    .setStyle(`LINK`)
    .setURL(`https://discord.gg/bWm7m95EA5`),
    
    
)

const embed = new MessageEmbed()
.setColor("BLUE")
.setAuthor({
    name: `${client.user.tag}`,
    iconURL: `${client.user.displayAvatarURL({dynamic: true, format: "png"})}`
})
.setTitle(`Hello!`)
.setThumbnail(`${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`)
.setDescription(`Hey there, 😊 Thanks For Adding me in ${guild.name} Wait till 1-2m to see my Slash Commands if still you can't see then manually enable it from Server Settings > Interegations`)

await channel.send({embeds: [embed], components: [row]})


})