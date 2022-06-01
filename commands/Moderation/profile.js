const { Command } = require("reconlx")
const { MessageEmbed } = require("discord.js")
const clientEmojis = require("../../index")
const { tick, cross, premium, owner, bughunter, staff, developer, supporter } = require("../../emojis")
const premiumSchema = require("../../Models/premiumSchema")
const supporterSchema = require("../../Models/supporter")
const staffSchema = require("../../Models/officialStaff")
const ownerSchema = require("../../Models/ownerSchema")

module.exports = new Command({
  name: `profile`,
  description: `Display's the bot profile of a member`,
  options: [
    {
      name: `member`,
      description: `member's profile to be viewed`,
      type: "USER",
      required: false
    }
  ],
  run: async({ interaction, client }) => {
    const member = interaction.options.getUser("member")

    let badges = [];
   
    const premiumBadge = await premiumSchema.findOne({
      User: member.id
    })
    if(premiumBadge){
      badges.push(`${premium} __**Premium User**__`)
    }
    const staffBadge = await staffSchema.findOne({
      User: member.id
    })
    if(staffBadge){
      badges.push(`${staff} __**Official Staff**__`)
    }
    const supporterBadge = await supporterSchema.findOne({
      User: member.id
    })
    if(supporterBadge){
      badges.push(`${supporter} __**Supporter**__`)
    }
    const ownerBadge = await ownerSchema.findOne({
      User: member.id
    })
    if(ownerBadge){
      badges.push(`${owner} __**Owner**__`)
    }
    const premiumMembership = await premiumSchema.findOne({
      User: member.id
    })
    let premiumBooleans = [];
    if(premiumMembership){
      premiumBooleans.push("`Activated`")
    }
    interaction.followUp({
      embeds: [
        new MessageEmbed()
        .setColor("#fc6060")
        .setAuthor({
          name: `${client.user.username} Profile for ${member.tag}!`,
          iconURL: `${client.user.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`
        })
        .setTitle(`${member.tag}'s Profile`)
        .setThumbnail(`${member.displayAvatarURL({dynamic: true, size: 1024, format: "png"})}`)
        .setDescription(`__**${client.user.username} Achievments**__\n ${badges.join("\n")}\n __**Premium Status**__\n${premiumBooleans.join("\n")}`)
      ]
    })
  }
})