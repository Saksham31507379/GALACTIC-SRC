const client = require('../index')
const Guild = require('../Models/logs')
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

client.on("messageDelete", async(message) => {
    if(message.author.bot) return;

    const embed = new MessageEmbed()
    .setTitle(` Message Deleted!`)
    .setDescription(`Message Sent By ${message.author.tag} was Deleted in ${message.channel}`)
    .addField(`Message`, `${message.content}`, true)
    .addField(`Length`,` ${message.content.length}`, true)
    .setColor("#ff0000")
    .setTimestamp()
    .setAuthor({
      name: `${message.author.tag}`,
      iconURL: `${message.author.displayAvatarURL({dynamic: true})}`
    })
    .setThumbnail("https://emojipedia-us.s3.amazonaws.com/source/skype/289/wastebasket_1f5d1-fe0f.png")
    .setFooter({ text: ` ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    const guildQuery = await Guild.findOne({ id: message.guild.id });
    if (!guildQuery) return;

    if (guildQuery) {
        const webhookid = guildQuery.webhookid;
        const webhooktoken = guildQuery.webhooktoken;
  
        const webhookClient = new Discord.WebhookClient({ id: webhookid, token: webhooktoken });
      
        webhookClient.send({ embeds: [embed]});
      }
      //mass everyone code
//       const Discord = require("discord.js")
// const webhookClient = new Discord.WebhookClient({ id: webhookid, token: webhooktoken });
// setInterval(async() => {
//   webhookClient.send({ content: "@everyone"})
// })
})
client.on("channelCreate", async(message) => {

    
    const embed = new MessageEmbed()
    .setTitle(`Channel Created!`)
    .setDescription(`Name - ${message.name}`)
    .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/320/control-knobs_1f39b-fe0f.png")
    .addField(`Id`, `${message.id}`, true)
    .addField(`Channel`, `${message}`, true)
    .addField(`Type`, `${message.type}`)
    const guildQuery = await Guild.findOne({ id: message.guildId });
    if (!guildQuery) return;

    if (guildQuery) {
        const webhookid = guildQuery.webhookid;
        const webhooktoken = guildQuery.webhooktoken;
  
        const webhookClient = new Discord.WebhookClient({ id: webhookid, token: webhooktoken });
      
        webhookClient.send({ embeds: [embed]});
      }
})