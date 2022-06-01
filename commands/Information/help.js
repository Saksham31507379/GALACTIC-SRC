const { Command } = require("reconlx")
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")
const Discord = require("discord.js")
const client = require("../../index")

module.exports = new Command({
  name: `help`,
  description: `Display's Help Menu of Galactic`,
  run: async({ interaction }) => {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel("INVITE ME")
      .setStyle("LINK")
      .setEmoji("<:sh_invite:969642699084951582>")
      .setURL('https://discord.com/oauth2/authorize?client_id=935432770879119430&permissions=8&scope=bot%20applications.commands')
  )
  const support = new MessageActionRow().addComponents(
    new MessageButton()
    .setLabel("SUPPORT SERVER")
    .setStyle("LINK")
    .setEmoji("<:sh_support1:968878387630338108>")
    .setURL('https://discord.gg/gMZdeXApuB')
)
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setThumbnail(`${client.user.displayAvatarURL({dynamic: true, size: 1024}) }`)
    .setDescription(`**Hey ${interaction.user}, My Name Is Galactic \n
    <:sh_commands:969641355263483965> I Have \`${client.commands.map(a => a).length}\` Commands \n
    
    <:sh_stats:969640595721183252> Guilds - ${client.guilds.cache.size} \n
    
    <a:sh_Latency:969640506315395132> Ping - ${client.ws.ping} \n

    <:sh_sls:969641979195568148> I Support \`/\` Commands
    
    Below Is The Help Menu Click On Them Accordingly! to Know My Commands

[Support Server](https://discord.gg/gMZdeXApuB) • [Invite Me](https://discord.com/oauth2/authorize?client_id=935432770879119430&scope=bot%20identify%20guilds%20applications.commands)**`)
    
    let timeout = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`**Timeout! Plz run this command again**`)
    let menu = new MessageActionRow().addComponents(
      new MessageSelectMenu()
      .setPlaceholder("Nothing Selected!")
      .setCustomId("helpmenu")
      .addOptions([
        {
          label: `Moderation`,
          value: `Moderation`,
          description: `Get All The Moderation Commands Of Galactic`,
          emoji: `
          <:sh_moderator:962339134406529054>`
        },
        {
          label: `Administrator`,
          value: `Administrator`,
          description: `Get all the Administrator Commands Of Galactic`,
          emoji: `<:sh_admin:969635933894889492>`
        },
        {
          label: "Giveaway",
          value: `Giveaway`,
          description: `Get All Giveaway Commands Of Galactic`,
          emoji: `<a:sh_giveaways:969636816196096032>`
        },
        {
          label: `Backup`,
          value: `Backup`,
          description: `Get All Backup Commands of Galactic`,
          emoji: `<:sh_backup:963822801515589682>`
        },
        {
          label: 'Economy',
          value: `Economy`,
          description: `Get All Economy Commands Of Galactic`,
          emoji: `<:sh_Coin:962622873023971338> `
        },
        {
          label: `Security & Automod`,
          value: `Security`,
          description: `Get All Security Commands Of Galactic`,
          emoji: `<:sh_bl_security:967250077766799400>`
        },
        {
          label: `Information`,
          value: `Info`,
          description: `Get All Informative Commands Of Galactic`,
          emoji: `<:Info:958948272599339090>`
        },
        {
          label: `Utility`,
          value: `util`,
          description: `Get All Utility Commands Of Galactic`,
          emoji: `<:sh_automod:963823434406715403>`
        },
        {
          label: `Message Tracking`,
          value: `msg`,
          description: `Get ALL Message Tracking Commands Of Galactic`,
          emoji: `<a:sh_messages:971441432965554196>`
        }
      ])
    )

    let collecter = await interaction.channel.createMessageComponentCollector({})
    collecter.on("collect", async(i) => {
      if(i.isSelectMenu()){
        if(i.customId === "helpmenu"){
          let [ director ] = i.values

          if(director === "Moderation"){
            return interaction.followUp({
              embeds: [
                new MessageEmbed().setTitle(`Moderation Commands`).setColor("BLUE").setDescription(`\`\`\`ban, kick, timeout, channel-clone, channel-nuke, addrole, role, delrole, purge, lock, unlock, hide, unhide, snipe\`\`\``)
              ], ephemeral: true
            })
          }
          if(director === "Backup"){
            return interaction.followUp({
              embeds: [
                new MessageEmbed().setTitle(`Backup Commands`).setColor("BLUE").setDescription(`\`\`\` backup-create, backup-info, backup-load\`\`\``)
              ], ephemeral: true
            })
          }
          if(director === "Giveaway"){
            return interaction.followUp({
              embeds: [
                new MessageEmbed().setTitle(`Giveaway Commands`).setColor("BLUE").setDescription(`\`\`\`g-create, g-end, g-reroll\`\`\``)
              ], ephemeral: true
            })
          }
          if(director === "Economy"){
            return interaction.followUp({
              embeds: [
                new MessageEmbed().setTitle(`Economy Commands`).setColor("BLUE").setDescription(`\`\`\`daily, add-balance, balance, deposit, leaderboard-economy\`\`\``)
              ], ephemeral: true
            })
          }
          if(director === "Security"){
            return interaction.followUp({
              embeds: [
                new MessageEmbed().setTitle(`Security Commands`).setColor("BLUE").setDescription(`\`\`\`antibot-enable, antilink, antilink-disable, antinuke-enable, antinuke-disable, antispam-enable, antispam-disable, whitelist-user, whitelist-remove, set-logging\`\`\``)
              ], ephemeral: true
            })
          }
          if(director === "Administrator"){
            return interaction.followUp({
              embeds: [
                new MessageEmbed().setTitle(`Administrator Commands`).setColor("BLUE").setDescription(`\`\`\`ticket-panel, self-roles, antiwords-add, antiwords-list, antiwords-remove, embed\`\`\``)
              ], ephemeral: true
            })
          }
          if(director === "Info"){
            return interaction.followUp({
              embeds: [
                new MessageEmbed().setTitle(`Info Commands`).setColor("BLUE").setDescription(`\`\`\`userinfo, profile, serverinfo, bump, meme, uptime, ping, stats, vote, help, avatar, membercount\`\`\``)
              ], ephemeral: true
            })
          }
          if(director === "util"){
            return interaction.followUp({
              embeds: [
                new MessageEmbed().setTitle(`Utility Commands`).setColor("BLUE").setDescription(`\`\`\`config, report, calculator, reminder-set, rps, tictactoe, random-pass, random-number, premium-perks, setup-join2Create, join2Create-disable\`\`\``)
              ], ephemeral: true
            })
          }
          if(director === "msg"){
            return interaction.followUp({
              embeds: [
                new MessageEmbed()
                .setTitle(`Message Tracking Commands`)
                .setColor("BLUE")
                .setFooter({
                  text: `More soon!`
                })
                .setDescription(`\`\`\`leaderboard-messages, messages-subtract, messages, reset-guild, resetmymessages\`\`\``)
              ]
            })
          }
        }
      }
    })
    let ok = interaction.followUp({embeds: [embed], components: [menu, button, support]})
    
    setTimeout(() => {
     interaction.editReply({embeds: [timeout], components: []})
  }, 120000);
  }
})