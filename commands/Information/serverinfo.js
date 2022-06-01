const { Command } = require("../../utils/command/command");
const ee = require(`../../settings/config`).embed
const moment= require('moment')
const Discord = require('discord.js')
const antilinkSchema = require("../../Models/antilinkSchema")
const mentionSchema = require('../../Models/antiMentionSchema')
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { channels } = require("../..");

module.exports = new Command({
  // options
  name: "serverinfo",
  description: `info about server`,
  userPermissions: ['VIEW_CHANNELS'],
  botPermissions: ['SEND_MESSAGES'],
  category: "Information",
  premium: false,
  // command start
  run: async ({ client, interaction, args, prefix }) => {

    
    const serverOwner = await interaction.guild.fetchOwner();
    const channels = interaction.guild.channels
    let enable = [];
    let mention = [];
    const members = interaction.guild.members
    

    const antilinkenabled = await antilinkSchema.findOne({
      Guild: interaction.guildId,
    })
    if(antilinkenabled){
      if(antilinkenabled){
        enable.push("<:sh_enabled:958324826383220766>")
      }
    }
    const messagemention = await mentionSchema.findOne({
      Guild: interaction.guildId,
    })
    if(messagemention){
      if(messagemention){
        mention.push("<:sh_enabled:958324826383220766>")
      }
    }
    const humans = interaction.guild.members.cache.filter(u => !u.user.bot).size
    const bots = interaction.guild.memberCount - humans
    // Code
    interaction.followUp({
      embeds: [
        new Discord.MessageEmbed()
        .setTitle('ServerInfo')
        .setThumbnail(`${interaction.guild.iconURL({dynamic: true, size: 1024, format: "png"})}`)
        .setColor(`BLURPLE`)
        .addField(`Owner`, `${serverOwner.user.tag}`)
        .addField(`Features`, `${interaction.guild.features.join(`\n`)}`)
        .addField(`Boosts`, `${interaction.guild.premiumSubscriptionCount || "No Boosts!"}` )
        .addField(`Partnered`, `${interaction.guild.partnered ? "<:sh_Greentick:969629657001504880>" : "<a:sh_error:972831898944548894>"}` )
        .addField(`Membercount`, `Total Bots - ${bots}\n Humans - ${humans}\n Total Members - ${interaction.guild.memberCount}`, )
        .addField(`Vanity URL`, `${interaction.guild.vanityURLCode || "No Vanity URL FOUND"}`)
        .addField(`Emojis`, `${interaction.guild.emojis.cache.size}`)

        
      ],
      
    })

    console.log(`serverinfo.js loaded`)
    
  },
})
