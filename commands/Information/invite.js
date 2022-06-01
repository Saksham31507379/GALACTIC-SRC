const {  Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const client = require("../../index")
const { Command } = require('reconlx');

module.exports = new Command({
    name: 'invite',
    description: `Get's the invite link of bot`,
    userPermissions: ["VIEW_CHANNEL"],
    options: [
        {
          name: "bot",
          description: `Link of the bot to be provided`,
          type: "STRING",
          required: true,
          choices: [
            {
              name: "galactic",
              value: "galactic",
            },
            {
              name: "galactic-prime",
              value: "galactic-prime",
            },
          ],
        },
      ],
    run: async ({ interaction }) => {
        const option = interaction.options.getString("bot")

        if(option === "galactic-prime"){
            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription("Galactic Prime is Under Development we'll release soon")
                ]
            })
        }
        const adminperms = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("LINK")
            .setLabel(`Invite With Admin Perms (Recommended)`)
            .setEmoji("<a:sh_p_heart:972423048324067389>")
            .setURL("https://discord.com/oauth2/authorize?client_id=935432770879119430&scope=bot%20identify%20guilds%20applications.commands")
        )
        const normalperms = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel("Invite with Normal Perms")
            .setStyle("LINK")
            .setEmoji("<a:sh_p_heart:972423048324067389>")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=935432770879119430&permissions=1127382248695&scope=bot%20applications.commands")
        )
        if(option === "galactic"){
            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Invite Galactic")
                    .setDescription("<a:sh_heart:972424007553019954>**Invite Galactic from the buttons**<a:sh_heart:972424007553019954>**")
                    .setThumbnail(`https://images-ext-1.discordapp.net/external/TsCk1kgPUNjU2j8QL_JUp0yn8PIK34Bc4HYgMRwb-zA/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/935432770879119430/47678edd29cf9bb7a985380924f2758f.png`)
                ],
                components: [normalperms, adminperms]
            })
        }
    }
    
})